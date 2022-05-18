import { Fragment } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { default as NextHead } from 'next/head';
import { Web3Provider } from '@components';
import { BasicLayout } from '@layouts';
import { defaultTheme } from '@styles';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

const App: NextPage<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <Fragment>
      <NextThemeProvider attribute="class" defaultTheme="dark" value={{ light: defaultTheme.className, dark: defaultTheme.className }}>
        <NextUIProvider>
          <Web3Provider>
            <NextHead>
              <base href="/" />
              <meta charSet="utf-8" />
              <title>InsureFi - A decentralized car insurance</title>
              <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
            </NextHead>
            <BasicLayout>
              <Component {...pageProps} />
            </BasicLayout>
          </Web3Provider>
        </NextUIProvider>
      </NextThemeProvider>
    </Fragment>
  );
};

export default App;
