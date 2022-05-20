import { Fragment } from 'react';
import { Container, Grid, Spacer, Text } from '@nextui-org/react';
import { AlchemyLogo, CoinbaseLogo, PolygonLogo, SuperfluidLogo } from '@components/logos';
import { NavItem } from '@components/nav-item';
import type { FC } from 'react';

export const PartnerSection: FC = () => {
  return (
    <Fragment>
      <Container as="section" css={{ py: '$20', textAlign: 'center' }} gap={0} md>
        <Text h2 size={36} weight="bold">
          Partners
        </Text>
        <Spacer y={4} />
        <Grid.Container css={{ p: '0px' }} gap={4} justify="space-between" alignItems="center">
          <Grid xs={12} sm={6} md={2} justify="center" alignItems="center">
            <NavItem href="https://www.superfluid.finance" target="_blank">
              <SuperfluidLogo css={{ width: 'auto', height: '$14' }} />
            </NavItem>
          </Grid>
          <Grid xs={12} sm={6} md={2} justify="center" alignItems="center">
            <NavItem href="https://www.alchemy.com" target="_blank">
              <AlchemyLogo css={{ width: 'auto', height: '$14' }} />
            </NavItem>
          </Grid>
          <Grid xs={12} sm={6} md={2} justify="center" alignItems="center">
            <NavItem href="https://www.polygon.com" target="_blank">
              <PolygonLogo css={{ width: 'auto', height: '$14' }} />
            </NavItem>
          </Grid>
          <Grid xs={12} sm={6} md={2} justify="center" alignItems="center">
            <NavItem href="https://www.coinbase.com" target="_blank">
              <CoinbaseLogo css={{ width: 'auto', height: '$14' }} />
            </NavItem>
          </Grid>
        </Grid.Container>
      </Container>
    </Fragment>
  );
};
