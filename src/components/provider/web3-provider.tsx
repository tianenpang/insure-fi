import { Fragment } from 'react';
import { apiProvider, configureChains, connectorsForWallets, RainbowKitProvider, wallet } from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';
import { useRainbowTheme } from '@hooks';
import type { FC, ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';

const needsInjectedWalletFallback = Boolean(
  typeof window !== 'undefined' && window.ethereum && !window.ethereum.isMetaMask && !window.ethereum.isCoinbaseWallet
);

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.polygon, chain.mainnet],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [wallet.metaMask({ chains, shimDisconnect: true }), wallet.rainbow({ chains })]
  },
  {
    groupName: 'Others',
    wallets: [
      wallet.walletConnect({ chains }),
      wallet.coinbase({ appName: 'InsureFi', chains }),
      ...(needsInjectedWalletFallback ? [wallet.injected({ chains })] : [])
    ]
  }
]);

const wagmiClient = createClient({
  provider,
  connectors,
  autoConnect: true
});

export const Web3Provider: FC<Web3ProviderProps> = (props: Web3ProviderProps) => {
  const { children } = props;

  const rainbowTheme = useRainbowTheme();

  return (
    <Fragment>
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={rainbowTheme} appInfo={{ appName: 'InsureFi' }}>
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </Fragment>
  );
};

interface Web3ProviderProps {
  children: ReactNode;
}
