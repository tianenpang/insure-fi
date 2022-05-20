import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row, Spacer, Text } from '@nextui-org/react';
import { ConnectButton } from '@components/connect-button';
import { Logo } from '@components/logos';
import { MobileMenu } from '@components/mobile-menu';
import { NavItem } from '@components/nav-item';
import { useMediaQuery } from '@hooks';
import { StyledHeader, StyledNavContainer } from './header.styles';
import type { FC } from 'react';

export const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {} = props;
  const isMobile = useMediaQuery(650);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    setScrollPosition((typeof window !== 'undefined' && window.scrollY) || 0);
  }, []);

  const onScroll = useCallback(() => {
    if (window.scrollY >= 0 && window.scrollY <= 500) {
      requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll.bind(this));
    return () => {
      window.removeEventListener('scroll', onScroll.bind(this));
    };
  }, [onScroll]);

  const detached = useMemo(() => {
    return Boolean(scrollPosition > 0);
  }, [scrollPosition]);

  return (
    <Fragment>
      <StyledHeader as="header">
        <StyledNavContainer detached={detached} showBlur={detached}>
          <Container as="nav" css={{ py: '$lg' }} display="flex" wrap="nowrap" justify="space-between" alignItems="center" md>
            {isMobile ? (
              <MobileMenu />
            ) : (
              <Col>
                <Row justify="flex-start" align="center">
                  <NavItem href="/">
                    <Logo css={{ size: '$14' }} />
                  </NavItem>
                </Row>
              </Col>
            )}
            <Col css={{ '@xsMax': { display: 'none' } }}>
              <Row justify="center" align="center">
                <NavItem href="/">
                  <Text span size="1.1rem">
                    Home
                  </Text>
                </NavItem>
                <Spacer x={2} />
                <NavItem href="/register">
                  <Text span size="1.1rem">
                    Register
                  </Text>
                </NavItem>
                <Spacer x={2} />
                <NavItem href="/claim">
                  <Text span size="1.1rem">
                    Claim
                  </Text>
                </NavItem>
              </Row>
            </Col>
            <Col>
              <Row justify="flex-end" align="center">
                <ConnectButton />
              </Row>
            </Col>
          </Container>
        </StyledNavContainer>
      </StyledHeader>
    </Fragment>
  );
};

interface HeaderProps {}
