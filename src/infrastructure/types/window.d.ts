export interface EthereumProvider {
  request(args: { method: 'eth_requestAccounts' }): Promise<string[]>;
  request(args: { method: 'eth_getBalance'; params: [string, 'latest'] }): Promise<string>;
  request(args: { method: 'wallet_revokePermissions'; params: [{ eth_accounts: Record<string, never> }] }): Promise<null>;
  on(eventName: 'accountsChanged', handler: (accounts: string[]) => void): void;
  on(eventName: 'chainChanged', handler: (chainId: string) => void): void;
  removeListener(eventName: 'accountsChanged', handler: (accounts: string[]) => void): void;
  removeListener(eventName: 'chainChanged', handler: (chainId: string) => void): void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
