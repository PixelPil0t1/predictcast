import { createAppKit } from '@reown/appkit';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { cookieStorage, createStorage } from 'wagmi';
import { WALLET_CONFIG } from '@config/constants';
import { ReactNode, useEffect } from 'react';

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: { [mainnet.id]: http() },
  storage: createStorage({ storage: cookieStorage }),
});

let appKitInstance: ReturnType<typeof createAppKit> | null = null;

export function getAppKit() {
  if (!appKitInstance) {
    const wagmiAdapter = new WagmiAdapter({ wagmiConfig });
    appKitInstance = createAppKit({
      projectId: WALLET_CONFIG.PROJECT_ID,
      adapters: [wagmiAdapter],
      metadata: {
        name: WALLET_CONFIG.APP_NAME,
        description: WALLET_CONFIG.APP_DESCRIPTION,
        url: WALLET_CONFIG.APP_URL,
        icons: [],
      },
    });
  }
  return appKitInstance;
}

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  useEffect(() => {
    getAppKit();
  }, []);

  return <>{children}</>;
}

export { wagmiConfig };

