import { getAppKit } from './WalletProvider';

export function ConnectButton() {
  const handleConnect = () => {
    getAppKit().open();
  };

  return (
    <button className="btn btn-primary" onClick={handleConnect}>
      Connect Wallet
    </button>
  );
}

