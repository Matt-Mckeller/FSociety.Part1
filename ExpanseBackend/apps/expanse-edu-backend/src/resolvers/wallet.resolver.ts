import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { WalletDto } from '../dto/WalletCoin.dto';
import { WalletService } from '../services/wallet.service';

// @Resolver((of) => CoinTypesDto)
@Resolver()
export class WalletResolver {
  constructor(private readonly walletService: WalletService) {}

  @Query((returns) => WalletDto)
  async wallet(@Context('req') req: Request | any): Promise<WalletDto> {
    const { expansePerson } = req;

    if (!expansePerson || !expansePerson.id) {
      throw new Error('Unable to find current user');
    }

    const wallet = await this.walletService.getWallet(expansePerson.id);
    const walletDTO = WalletDto.fromWallet(wallet);

    return walletDTO;
  }
}
