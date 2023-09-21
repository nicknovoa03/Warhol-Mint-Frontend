import React from 'react';
import Head from 'next/head';
import 'aos/dist/aos.css';
import '../theme/globals.css';
import Page from '../components/Page';
import { Web3Modal } from '@web3modal/react';
import { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { mainnet } from 'wagmi/chains';
import * as dotenv from 'dotenv'; // Import dotenv module
dotenv.config(); // Load the .env file

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = '72e247ee043a24a6e5ecfa195061a9fd';

// 2. Configure wagmi client
const chains = [mainnet];
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
});

// 3. Configure modal ethereum client
export const ethereumClient = new EthereumClient(wagmiConfig, chains);

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Warhol Mint</title>
        <meta name="description" content="Decentralized Pooling Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiConfig config={wagmiConfig}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </React.Fragment>
  );
}
