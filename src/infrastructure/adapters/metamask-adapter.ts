import type { Wallet } from '../../domain/models/wallet';
import type { WalletRepository } from '../../domain/repositories/wallet-repository';

export class MetamaskAdapter implements WalletRepository {
  private formatBalance(hexBalance: string): number {
    const balanceWei = parseInt(hexBalance, 16);
    return balanceWei / 1e18;
  }

  async connect(): Promise<Wallet> {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('Metamask is not installed');
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];

    if (!address) {
      throw new Error('No address found');
    }

    const balance = await this.getBalance(address);
    return { address, balance };
  }

  async disconnect(): Promise<void> {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_revokePermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
      } catch (error) {
        console.error('Failed to revoke permissions', error);
      }
    }
  }

  async getBalance(address: string): Promise<number> {
    if (!window.ethereum) throw new Error('Metamask is not installed');

    const hexBalance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });

    return this.formatBalance(hexBalance);
  }

  onAccountChange(callback: (wallet: Wallet | null) => void): void {
    if (!window.ethereum) return;

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        callback(null);
      } else {
        const address = accounts[0]!;

        void this.getBalance(address).then((balance) => {
          callback({ address, balance });
        });
      }
    });
  }

  onChainChange(callback: () => void): void {
    if (!window.ethereum) return;

    window.ethereum.on('chainChanged', () => {
      callback();
    });
  }
}
