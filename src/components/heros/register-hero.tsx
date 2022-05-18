import { Fragment } from 'react';
import { Col, Container, Grid, Row, Spacer } from '@nextui-org/react';
import { default as NextImage } from 'next/image';
import { QuoteModal } from '@components/quote-modal';
import { StyledImageContainer, StyledSubtitle, StyledTitle } from './hero.styles';
import type { FC } from 'react';

export const RegisterHero: FC = () => {
  return (
    <Fragment>
      <Container
        as="section"
        display="flex"
        alignItems="center"
        justify="space-between"
        wrap="nowrap"
        gap={0}
        md
        css={{ height: 'calc(75vh - 80px)', minHeight: 'calc(75vh - 80px)', '@xsMax': { height: 'calc(100vh - 64px)' } }}
      >
        <Row align="center" wrap="wrap" css={{ zIndex: '$2', '@mdMax': { mt: '80px', p: '0 8px' }, '@xsMax': { mt: '0px' } }}>
          <Col css={{ position: 'relative', zIndex: '$2', '@md': { width: '50%' }, '@mdMax': { width: '100%' } }}>
            <StyledTitle css={{ mb: 0 }}>Secure your car and your payment</StyledTitle>
            <StyledSubtitle>Get insured and enjoy your ride with full protection from InsureFi</StyledSubtitle>
            <Spacer y={1.5} />
            <Grid.Container gap={0} alignItems="center" css={{ '@md': { mt: '$lg' } }}>
              <Grid xs={12} sm={9}>
                <QuoteModal />
              </Grid>
            </Grid.Container>
          </Col>
          <Col span={6} css={{ height: '100%', position: 'relative', '@mdMax': { display: 'none' } }}>
            <StyledImageContainer>
              <NextImage
                alt="hero-image"
                width={485}
                height={486}
                src="/assets/image/register-hero.png"
                unselectable="on"
                objectPosition="center"
              />
            </StyledImageContainer>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
