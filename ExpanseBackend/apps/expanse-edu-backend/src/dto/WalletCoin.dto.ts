import { Optional } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Wallet } from '../services/wallet.service';
import { from } from 'form-data';

@ObjectType()
export class WalletDto {
  @Field((type) => [WalletCoinDto], { nullable: false })
  coins: WalletCoinDto[];

  // gems: {};
  // essences: {};
  // tickets: {};

  static fromWallet(wallet: Wallet): WalletDto {
    return {
      coins: WalletCoinDto.fromWallet(wallet),
    };
  }
}
@ObjectType()
export class WalletCoinDto {
  @Field((type) => String, { nullable: false })
  coinId: string;

  @Field((type) => String, { nullable: false })
  quantity: number;

  @Field((type) => String, { nullable: false })
  name: string;

  @Field((type) => String, { nullable: true })
  coinIconText: string;

  @Field((type) => String, { nullable: true })
  schoolId: string;

  @Field((type) => String, { nullable: true })
  classId: string;

  @Field((type) => String, { nullable: true })
  courseId?: string;

  static fromWallet(wallet: Wallet): WalletCoinDto[] {
    return wallet.coins.map((coin) => {
      const walletCoinDTO = {
        ...coin,
        coinId: coin.id,
        schoolId: coin.school?.id,
        classId: coin.class?.id,
        courseId: coin.course?.id,
      };
      delete walletCoinDTO.id;
      return walletCoinDTO as WalletCoinDto;
    });
  }
}
