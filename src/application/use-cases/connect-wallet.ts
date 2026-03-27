import type { Wallet } from '../../domain/models/wallet';
import type { WalletRepository } from '../../domain/repositories/wallet-repository';

export class ConnectWalletUseCase {
  private walletRepository: WalletRepository;
  
  constructor(walletRepository: WalletRepository) {
    this.walletRepository = walletRepository;
  }

  async execute(): Promise<Wallet> {
    return this.walletRepository.connect();
  }
}
