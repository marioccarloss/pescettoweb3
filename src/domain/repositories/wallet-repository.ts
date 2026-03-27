import type { Wallet } from '../models/wallet';

export interface WalletRepository {
  connect(): Promise<Wallet>;
  disconnect(): Promise<void>;
  getBalance(address: string): Promise<number>;
  onAccountChange(callback: (wallet: Wallet | null) => void): void;
  onChainChange(callback: () => void): void;
}
