import { Fragment } from 'react';
import { Button, Loading } from '@nextui-org/react';
import { default as NextHead } from 'next/head';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import registerABI from '@lib/abi/Registration.json';
import type { NextPage } from 'next';

const contractConfig = {
  addressOrName: '0x92a5B68B469B726c2Ee71Ba80EbEd0f56c8Ad3E3', // testnet
  // addressOrName: '0x8DA6b6Dd929deed2237eBE41e0AABF4862d0b93A', // local
  contractInterface: registerABI
};

const DemoPage: NextPage<demoPageProps> = (props: demoPageProps) => {
  const {} = props;

  const registration = useContractWrite(contractConfig, 'registerCar', {
    onSettled(_, error) {
      const e = error as { reason: string } | null;
      console.log(e?.reason);
    }
  });

  const waitForTransaction = useWaitForTransaction({
    wait: registration.data?.wait,
    hash: registration.data?.hash,
    onSuccess(data) {
      console.log('waitForTransaction onSuccess', data);
    },
    onError(error) {
      console.log('waitForTransaction onError', error);
    },
    onSettled(data, error) {
      console.log('waitForTransaction onSettled', { data, error });
    }
  });

  const clickHandler = async () => {
    await registration.writeAsync({
      args: ['Audi', 'A4', 2012, 10000, '000A4']
    });
  };

  return (
    <Fragment>
      <NextHead>
        <title>Demo | InsureFi - A decentralized car insurance</title>
      </NextHead>
      <Button auto color="secondary" size="lg" ripple={false} css={{ width: '100%' }} onClick={() => clickHandler()}>
        {registration.isLoading || waitForTransaction.isLoading ? <Loading color="currentColor" size="sm" /> : 'Submit'}
      </Button>
    </Fragment>
  );
};

interface demoPageProps {}

export default DemoPage;
