import { ConnectButton } from '@features/wallet/ConnectButton';

export function Header() {
  return (
    <header className="header" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 'var(--space-xl)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        <h1>🔮 PredictCast</h1>
      </div>
      <ConnectButton />
    </header>
  );
}

