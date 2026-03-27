import type { Wallet } from '../../domain/models/wallet';
import { ConnectWalletUseCase } from '../../application/use-cases/connect-wallet';
import { DisconnectWalletUseCase } from '../../application/use-cases/disconnect-wallet';
import { MetamaskAdapter } from '../adapters/metamask-adapter';

export type WalletState = {
  wallet: Wallet | null;
  isConnecting: boolean;
  error: string | null;
};

const metamaskAdapter = new MetamaskAdapter();
const connectWalletUseCase = new ConnectWalletUseCase(metamaskAdapter);
const disconnectWalletUseCase = new DisconnectWalletUseCase(metamaskAdapter);

let state: WalletState = {
  wallet: null,
  isConnecting: false,
  error: null,
};

type Listener = () => void;
const listeners = new Set<Listener>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

metamaskAdapter.onAccountChange((wallet) => {
  state = { ...state, wallet };
  emitChange();
});

metamaskAdapter.onChainChange(() => {
  window.location.reload();
});

export const walletStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getSnapshot(): WalletState {
    return state;
  },

  async connect() {
    state = { ...state, isConnecting: true, error: null };
    emitChange();

    try {
      const wallet = await connectWalletUseCase.execute();
      state = { ...state, wallet, isConnecting: false };
      emitChange();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Connection failed';
      state = { ...state, error: errorMessage, isConnecting: false };
      emitChange();
    }
  },

  async disconnect() {
    await disconnectWalletUseCase.execute();
    state = { ...state, wallet: null, error: null };
    emitChange();
  },
};
