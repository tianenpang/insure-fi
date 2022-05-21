import { Fragment } from 'react';
import { Container, Grid, Row, Spacer, Text } from '@nextui-org/react';
import { Document, Filter, ShieldDone, Wallet } from 'react-iconly';
import { StyledProcessCard } from './section.styles';
import type { FC, ReactNode } from 'react';
import type { IconProps } from 'react-iconly';

const iconProps: IconProps = {
  size: 'large',
  set: 'curved',
  primaryColor: 'currentColor'
};

type ProcessItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

const processItems: ProcessItem[] = [
  {
    icon: <Wallet {...iconProps} />,
    title: 'Connect wallet',
    description: 'Use our various provided wallet services to link your account'
  },
  {
    icon: <Document {...iconProps} />,
    title: 'Input information',
    description: 'Answer questions about your car to optimize plan'
  },
  {
    icon: <Filter {...iconProps} />,
    title: 'Customize plan',
    description: 'Survey our plans based on your answers and select best fit'
  },
  {
    icon: <ShieldDone {...iconProps} />,
    title: 'Make payment',
    description: 'Get insured with a click of the button, no need for card details'
  }
];

export const HowItWorksSection: FC = () => {
  return (
    <Fragment>
      <Container as="section" css={{ py: '$20', textAlign: 'center' }} gap={0} md>
        <Text h2 size={36} weight="bold">
          How it works
        </Text>
        <Spacer y={4} />
        <Grid.Container css={{ p: '0px' }} gap={4} justify="space-between">
          {processItems.map((item: ProcessItem, index: number) => (
            <Grid key={`${item.title}-${index}`} xs={12} sm={6} md={3} lg={3}>
              <StyledProcessCard>
                <Row align="center">
                  <div className="icon">{item.icon}</div>
                  <Text b css={{ my: 0, fontSize: '1.1rem', ml: '$4' }}>
                    {item.title}
                  </Text>
                </Row>
                <Row align="center" css={{ px: '$4', pt: '$4', pb: '$4' }}>
                  <Text css={{ color: '$accents8', textAlign: 'left' }}>{item.description}</Text>
                </Row>
              </StyledProcessCard>
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </Fragment>
  );
};
