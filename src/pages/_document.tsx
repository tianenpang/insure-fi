import { Children } from 'react';
import { CssBaseline } from '@nextui-org/react';
import { Head, Html, Main, default as NextDocument, NextScript } from 'next/document';
import { globalStyles } from '@styles';
import type { NextPage } from 'next';
import type { DocumentContext, DocumentInitialProps, DocumentProps } from 'next/document';

const Document: NextPage<DocumentProps, DocumentInitialProps> = (props: DocumentProps) => {
  const { locale } = props;

  return (
    <Html dir="ltr" lang={locale}>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="robots" content="follow, index" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="keywords" content="Decentralized, Finance, Insurance, Blockchain, Web3, InsureFi" />
        <link rel="preload" href="/assets/fonts/Inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="/assets/image/og-image.png" />
        <meta name="twitter:image" content="/assets/image/og-image.png" />
        <meta property="og:title" content="InsureFi - A decentralized car insurance" />
        <meta name="twitter:title" content="InsureFi - A decentralized car insurance" />
        <meta property="og:site_name" content="InsureFi - A decentralized car insurance" />
        <meta
          name="description"
          content="A decentralized car insurance company that aims at making car insurance coverage hassle free and smooth"
        />
        <meta
          property="og:description"
          content="A decentralized car insurance company that aims at making car insurance coverage hassle free and smooth"
        />
        <meta
          name="twitter:description"
          content="A decentralized car insurance company that aims at making car insurance coverage hassle free and smooth"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

Document.getInitialProps = async (context: DocumentContext): Promise<DocumentInitialProps> => {
  const initialProps = await NextDocument.getInitialProps(context);
  globalStyles();

  return {
    ...initialProps,
    styles: [...Children.toArray([initialProps.styles, CssBaseline.flush()])]
  };
};

export default Document;
