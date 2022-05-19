import { Fragment } from 'react';
import { Card, Text } from '@nextui-org/react';
import { MoreCircle } from 'react-iconly';
import type { FC } from 'react';

export const CarMakeTip: FC<CarMakeTipProps> = (props: CarMakeTipProps) => {
  const {} = props;

  return (
    <Fragment>
      <Card css={{ '& div:first-child': { flexDirection: 'row', justifyContent: 'space-between' } }}>
        <Text>Supported: BMW, Mercedes, Audi, GMC, Chevrolet, Ford, Toyota, Honda, Nissan</Text>
        <MoreCircle primaryColor="#F5A524" set="bold" />
      </Card>
    </Fragment>
  );
};

interface CarMakeTipProps {}
