import { Fragment } from 'react';
import { Button, Col, Container, Grid, Row, Spacer } from '@nextui-org/react';
import { default as NextImage } from 'next/image';
import { useRouter } from 'next/router';
import { StyledImageContainer, StyledSubtitle, StyledTitle } from './hero.styles';
import type { FC } from 'react';

export const ClaimHero: FC = () => {
  const router = useRouter();

  const getStartedHandler = async () => {
    await router.push('/register');
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
        css={{ height: 'calc(75vh - 80px)', minHeight: 'calc(75vh - 80px)', '@xsMax': { height: 'calc(100vh - 64px)' } }}
      >
        <Row align="center" wrap="wrap" css={{ zIndex: '$2', '@mdMax': { mt: '80px', p: '0 8px' }, '@xsMax': { mt: '0px' } }}>
          <Col css={{ position: 'relative', zIndex: '$2', '@md': { width: '50%' }, '@mdMax': { width: '100%' } }}>
            <StyledTitle css={{ mb: 0 }}>Claim approval like a snap of your finger</StyledTitle>
            <StyledSubtitle>File your cliam and get approval and payout in under 10 minutes</StyledSubtitle>
            <Spacer y={1.5} />
            <Grid.Container gap={0} alignItems="center" css={{ '@md': { mt: '$lg' } }}>
              <Grid xs={12} sm={9}>
                <Button
                  type="button"
                  color="gradient"
                  size="lg"
                  auto
                  ripple={false}
                  onClick={() => getStartedHandler()}
                  css={{ maxHeight: '$space$14', '@xsMax': { width: '100%', marginBottom: '$8' } }}
                >
                  Get Started
                </Button>
              </Grid>
            </Grid.Container>
          </Col>
          <Col span={6} css={{ height: '100%', position: 'relative', '@mdMax': { display: 'none' } }}>
            <StyledImageContainer>
              <NextImage
                alt="hero-image"
                width={479}
                height={490}
                src="/assets/image/claim-hero.png"
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
