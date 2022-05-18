import { Fragment } from 'react';
import { Col, Container, Grid, Row, Spacer, Text } from '@nextui-org/react';
import { Category, Scan, ShieldDone, User } from 'react-iconly';
import { StyledBlurCard, StyledImage } from './section.styles';
import type { GridProps } from '@nextui-org/react';
import type { FC } from 'react';
import type { IconProps } from 'react-iconly';

const iconProps: IconProps = {
  size: 'large',
  set: 'curved',
  primaryColor: 'currentColor'
};

const gridItemProps: GridProps = {
  xs: 12,
  md: 6,
  css: {
    dflex: 'flex-start',
    flexDirection: 'column',
    gap: '$sm'
  }
};

export const WhyChooseUsSection: FC = () => {
  return (
    <Fragment>
      <Container as="section" css={{ pt: '$20', pb: 'calc($20 + $xl)' }} gap={0} md>
        <Text h2 size={36} weight="bold" css={{ textAlign: 'center' }}>
          Why choose us
        </Text>
        <Spacer y={4} />
        <Row justify="space-between" align="center" wrap="wrap">
          <Col span={5.5} css={{ position: 'relative' }}>
            <StyledImage
              alt="car-image"
              width={455}
              height={395}
              src="/assets/image/why-choose-us.png"
              unselectable="on"
              objectPosition="center"
            />
            <StyledBlurCard
              css={{ width: '455px', position: 'absolute', bottom: '-$xl', right: '$xl', p: '$xl', textAlign: 'center' }}
            >
              <Text h4>The power is in your hands</Text>
              <Spacer y={1.5} />
              <Text>We work for you as your wish is our command</Text>
            </StyledBlurCard>
          </Col>
          <Col span={5.5}>
            <Grid.Container css={{ p: '0px' }} gap={4} justify="center">
              <Grid {...gridItemProps}>
                <User {...iconProps} />
                <Text b>Hassle free registration</Text>
                <Text>Straightforward registration that saves time</Text>
              </Grid>
              <Grid {...gridItemProps}>
                <Scan {...iconProps} />
                <Text b>Instant claim approval</Text>
                <Text>File your claim and get a decision with a snap of finger</Text>
              </Grid>
              <Grid {...gridItemProps}>
                <Category {...iconProps} />
                <Text b>100% Decentralized</Text>
                <Text>Data is secured on blockchain, no fear of large corporation</Text>
              </Grid>
              <Grid {...gridItemProps}>
                <ShieldDone {...iconProps} />
                <Text b>All round protection</Text>
                <Text>Protects all whether comprehensive or third-party</Text>
              </Grid>
            </Grid.Container>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
