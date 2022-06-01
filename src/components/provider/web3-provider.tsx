import { Fragment } from 'react';
import { connectorsForWallets, RainbowKitProvider, wallet } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { useRainbowTheme } from '@hooks';
import type { FC, ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';

const needsInjectedWalletFallback = Boolean(
  typeof window !== 'undefined' && window.ethereum && !window.ethereum.isMetaMask && !window.ethereum.isCoinbaseWallet
);

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    jsonRpcProvider({
      rpc: () => ({ http: 'https://speedy-nodes-nyc.moralis.io/1081efd32566a9cdb0bd5ccf/polygon/mumbai' })
    }),
    publicProvider()
  ]
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
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={rainbowTheme}
          appInfo={{
            appName: 'InsureFi',
            learnMoreUrl: 'https://insurefi.vercel.app'
          }}
        >
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </Fragment>
  );
};

interface Web3ProviderProps {
  children: ReactNode;
}
