import { Fragment } from 'react';
import { Button, Col, Container, Grid, Row, Spacer } from '@nextui-org/react';
import { default as NextImage } from 'next/image';
import { useRouter } from 'next/router';
import { QuoteModal } from '@components/quote-modal';
import { StyledGradientBackground, StyledGradientTitle, StyledImageContainer, StyledSubtitle, StyledTitle } from './hero.styles';
import type { FC } from 'react';

export const IndexHero: FC = () => {
  const router = useRouter();

  const goClaimHandler = async () => {
    await router.push('/claim');
  };

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
        css={{ height: 'calc(100vh - 80px)', minHeight: 'calc(100vh - 80px)' }}
      >
        <StyledGradientBackground />
        <Row align="center" wrap="wrap" css={{ zIndex: '$2', '@mdMax': { mt: '80px', p: '0 8px' }, '@xsMax': { mt: '0px' } }}>
          <Col css={{ position: 'relative', zIndex: '$2', '@md': { width: '50%' }, '@mdMax': { width: '100%' } }}>
            <StyledTitle css={{ mb: 0 }}>Get&nbsp;</StyledTitle>
            <StyledGradientTitle css={{ mb: 0 }}>full&nbsp;</StyledGradientTitle>
            <StyledGradientTitle css={{ mb: 0 }}>protection&nbsp;</StyledGradientTitle>
            <StyledTitle css={{ mb: 0, '@xsMax': { d: 'inline-block' } }}>the decentralized way</StyledTitle>
            <StyledSubtitle>Get insured and enjoy your ride with full protection from InsureFi</StyledSubtitle>
            <Spacer y={1.5} />
            <Grid.Container gap={0} alignItems="center" css={{ '@md': { mt: '$lg' } }}>
              <Grid xs={12} sm={3}>
                <QuoteModal />
              </Grid>
              <Grid xs={12} sm={9}>
                <Button
                  type="button"
                  color="gradient"
                  size="lg"
                  auto
                  bordered
                  ripple={false}
                  onClick={() => goClaimHandler()}
                  css={{ maxHeight: '$space$14', '@xsMax': { width: '100%', marginBottom: '$8' } }}
                >
                  File Claim
                </Button>
              </Grid>
            </Grid.Container>
          </Col>
          <Col span={6} css={{ height: '100%', position: 'relative', '@mdMax': { display: 'none' } }}>
            <StyledImageContainer>
              <NextImage
                alt="hero-image"
                width={543}
                height={620}
                src="/assets/image/index-hero.png"
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
