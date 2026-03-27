import { useSyncExternalStore } from 'react';
import { walletStore } from '../../../store/wallet-store';
import './wallet-connector.css';

function truncateAddress(address: string): string {
  if (address.length < 10) return address;
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
}

export function WalletConnector() {
  const { wallet, isConnecting, error } = useSyncExternalStore(
    walletStore.subscribe,
    walletStore.getSnapshot,
  );

  const isConnected = wallet !== null;

  return (
    <div className="wallet-connector">
      {error !== null && (
        <div className="wallet-connector__error" role="alert">
          {error}
        </div>
      )}

      {isConnected && wallet.balance !== null && (
        <div className="wallet-connector__balance">{wallet.balance.toFixed(4)} ETH</div>
      )}

      <button
        type="button"
        className="wallet-connector__button"
        onClick={() => {
          if (isConnected) {
            walletStore.disconnect();
          } else {
            void walletStore.connect();
          }
        }}
        disabled={isConnecting}
      >
        <span className="wallet-connector__button-text">
          {isConnecting
            ? 'Conectando...'
            : isConnected && wallet
              ? truncateAddress(wallet.address)
              : 'Conectar monedero'}
        </span>
      </button>

      {isConnected && (
        <button
          type="button"
          className="wallet-connector__disconnect"
          onClick={() => walletStore.disconnect()}
          aria-label="Desconectar monedero"
        >
          Desconectar
        </button>
      )}
    </div>
  );
}
