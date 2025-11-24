import { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { WalletProvider, wagmiConfig } from '@features/wallet/WalletProvider';
import { useFarcasterFrame } from '@features/farcaster/FarcasterFrame';
import { Header } from '@components/ui/Header';
import { Tabs } from '@components/ui/Tabs';
import { EventsPage } from '@pages/EventsPage';
import { CreateEventPage } from '@pages/CreateEventPage';
import { MyPredictionsPage } from '@pages/MyPredictionsPage';

type TabId = 'events' | 'create' | 'predictions';

const TABS = [
  { id: 'events' as const, label: 'Події' },
  { id: 'create' as const, label: 'Створити' },
  { id: 'predictions' as const, label: 'Мої прогнози' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('events');
  useFarcasterFrame();

  const renderPage = () => {
    switch (activeTab) {
      case 'events':
        return <EventsPage />;
      case 'create':
        return <CreateEventPage />;
      case 'predictions':
        return <MyPredictionsPage />;
    }
  };

  return (
    <WagmiProvider config={wagmiConfig}>
      <WalletProvider>
        <div className="container">
          <Header />
          <Tabs tabs={TABS} activeTab={activeTab} onChange={id => setActiveTab(id as TabId)} />
          <main>{renderPage()}</main>
          <footer style={{
            marginTop: 'var(--space-2xl)',
            padding: 'var(--space-lg)',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            borderTop: '1px solid var(--border-primary)',
          }}>
            <p>PredictCast • Farcaster Frame • WalletConnect • Wagmi v3 • Powered by Web3</p>
          </footer>
        </div>
      </WalletProvider>
    </WagmiProvider>
  );
}

