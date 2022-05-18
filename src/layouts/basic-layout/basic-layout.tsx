import { Fragment } from 'react';
import { Container } from '@nextui-org/react';
import { Footer, Header } from '@components';
import type { FC, ReactNode } from 'react';

export const BasicLayout: FC<BasicLayoutProps> = (props: BasicLayoutProps) => {
  const { children } = props;

  return (
    <Fragment>
      <Header />
      <Container as="main" css={{ my: '$lg' }} md>
        {children}
      </Container>
      <Footer />
    </Fragment>
  );
};

interface BasicLayoutProps {
  children: ReactNode;
}
