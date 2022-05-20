import { Button, Row, Spacer, Text } from '@nextui-org/react';
import { Logout } from 'react-iconly';
import { Logo } from '@components/logos';
import { NavItem } from '@components/nav-item';
import { Portal } from '@components/portal';
import { commonMotion, navMotion } from '@styles';
import { StyledNav, StyledSideNavContent, StyledSideNavOverlay } from './mobile-menu.styles';
import type { FC } from 'react';

export const SideNav: FC<SideNavProps> = (props: SideNavProps) => {
  const { onClose } = props;

  return (
    <Portal className="mobile-menu-portal" overflowHidden>
      <StyledSideNavContent {...navMotion.sideMenu}>
        <Button
          css={{ marginLeft: 'auto', transform: 'scale(-1, 1)' }}
          icon={<Logout primaryColor="currentColor" set="curved" />}
          auto
          light
          onClick={() => onClose()}
        />
        <StyledNav>
          <NavItem href="/">
            <Text span size="1.1rem">
              Home
            </Text>
          </NavItem>
          <NavItem href="/register">
            <Text span size="1.1rem">
              Register
            </Text>
          </NavItem>
          <NavItem href="/claim">
            <Text span size="1.1rem">
              Claim
            </Text>
          </NavItem>
        </StyledNav>
        <Row css={{ marginTop: 'auto' }}>
          <NavItem href="/" css={{ dflex: 'center' }}>
            <Logo css={{ size: '$12' }} />
            <Spacer x={1} />
            <Text h5>InsureFi</Text>
          </NavItem>
        </Row>
      </StyledSideNavContent>
      <StyledSideNavOverlay {...commonMotion.overlay} onClick={() => onClose()} />
    </Portal>
  );
};

interface SideNavProps {
  onClose: () => void;
}
