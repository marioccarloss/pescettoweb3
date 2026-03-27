import type { WalletRepository } from '../../domain/repositories/wallet-repository';

export class DisconnectWalletUseCase {
  private walletRepository: WalletRepository;

  constructor(walletRepository: WalletRepository) {
    this.walletRepository = walletRepository;
  }

  async execute(): Promise<void> {
    await this.walletRepository.disconnect();
  }
}
