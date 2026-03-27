export interface Wallet {
  address: string;
  balance: number | null;
}

export interface WalletError {
  message: string;
}
