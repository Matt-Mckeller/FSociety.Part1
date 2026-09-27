import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Coin } from '../entities/Coin.entity';
import { CoinEvent, ExpansePerson, ExpansePersonToCoin } from '../entities';
import { RewardableEvent } from '../entities/RewardableEvent.entity';

export interface Wallet {
  coins: (Coin & { quantity: number })[];
}

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Coin, 'main')
    private coinTypeRepository: Repository<Coin>,
    @InjectDataSource('main')
    private mainDataSource: DataSource,
  ) {}

  async findByName(name: string): Promise<Coin> {
    return this.coinTypeRepository.findOne({ where: { name } });
  }

  async findAll(): Promise<Coin[]> {
    return this.coinTypeRepository.find();
  }

  async getWallet(expansePersonId: string): Promise<Wallet> {
    const manager = this.mainDataSource.manager;
    const expansePerson = await manager.findOne(ExpansePerson, {
      where: { id: expansePersonId },
      relations: [
        'expansePersonToCoins',
        'expansePersonToCoins.coin',
        // may want to make this optional, could be an unnecessary performance hit if not needed
        'expansePersonToCoins.coin.class',
        'expansePersonToCoins.coin.course',
        'expansePersonToCoins.coin.school',
      ],
    });

    const coins = expansePerson.expansePersonToCoins.map(
      (expansePersonToCoin) => {
        const response = {
          ...expansePersonToCoin.coin,
          quantity: expansePersonToCoin.quantity,
        };
        delete response.createdAt;
        delete response.updatedAt;
        return response;
      },
    );
    return { coins };
  }

  async addCoins(
    coinId: string,
    expansePersonId: string,
    amount: number,
    eventType: string,
  ): Promise<boolean> {
    // get personToCoin for person and coin, add amount to quantity, save

    if (!coinId || !expansePersonId) {
      throw new Error('Must provide Coin and Person id to add coins');
    }

    const manager = this.mainDataSource.manager;
    const expansePersonToCoin = await manager.findOne(ExpansePersonToCoin, {
      where: { expansePerson: { id: expansePersonId }, coin: { id: coinId } },
    });

    if (!expansePersonToCoin) {
      throw new Error(
        'Add coins can not be used to initialize a new coin to person relationship',
      );
    }

    await this.mainDataSource.transaction(async (entityManager) => {
      try {
        expansePersonToCoin.quantity += amount;
        await entityManager.save(expansePersonToCoin);

        // Your database operations here
        const coinEvent = new CoinEvent();
        coinEvent.changeAmount = amount;
        coinEvent.eventType = eventType;
        coinEvent.expansePersonToCoin = expansePersonToCoin;
        coinEvent.newValue = expansePersonToCoin.quantity;
        await entityManager.save(coinEvent);
      } catch (error) {
        // If an error occurs, the transaction will be rolled back
        console.error('Adding coins to wallet transaction failed:', error);
        throw error; // Re-throw the error to ensure rollback
      }
    });

    return true;
  }

  async calculateRewardCoins(
    rewardableEventId: string,
  ): Promise<{ coins: (Coin & { addedCoins: number })[] }> {
    if (!rewardableEventId) {
      throw new Error(
        'Must provide rewardableEventId to calculate reward coins',
      );
    }

    const manager = this.mainDataSource.manager;

    // Fetch the rewardable event and its associated class and school
    const rewardableEvent = await manager.findOne(RewardableEvent, {
      where: { id: rewardableEventId },
      relations: ['class', 'school'],
    });

    if (!rewardableEvent) {
      throw new Error('Rewardable event not found');
    }

    const { class: eventClass, school: eventSchool } = rewardableEvent;

    if (!eventClass || !eventSchool) {
      throw new Error(
        'Rewardable event must be associated with a class and a school',
      );
    }

    // Fetch coins associated with the class and school
    const coins = await this.coinTypeRepository.find({
      where: [
        { class: { id: eventClass.id } },
        { school: { id: eventSchool.id } },
      ],
    });

    // Calculate random added value for each coin
    const rewardedCoins = coins.map((coin) => {
      const addedCoins = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
      return {
        ...coin,
        addedCoins,
      };
    });

    return { coins: rewardedCoins };
  }
}
