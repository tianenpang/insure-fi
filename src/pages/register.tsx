import { Fragment, useMemo, useState } from 'react';
import { Loading, Modal, Text } from '@nextui-org/react';
import { default as NextHead } from 'next/head';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { FlowForm, RegisterForm, RegisterHero } from '@components';
import registerABI from '@lib/abi/Registration.json';
import type { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';
import type { NextPage } from 'next';

const registrationContractConfig = {
  addressOrName: '0x92a5B68B469B726c2Ee71Ba80EbEd0f56c8Ad3E3',
  contractInterface: registerABI
};

const RegisterPage: NextPage = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isPaymentVisible, setPaymentVisible] = useState<boolean>(false);

  const payment = useContractWrite(registrationContractConfig, 'makePayment', {
    onSettled: async (_, error) => {
      console.log('payment onSettled error:', error);
    }
  });

  const waitPayment = useWaitForTransaction({
    wait: payment.data?.wait,
    hash: payment.data?.hash,
    onSuccess: async (data: TransactionReceipt) => {
      console.log(`Payment transaction: https://mumbai.polygonscan.com/tx/${data.transactionHash}`);
    }
  });

  const onRegisterError = async (error: Error) => {
    console.log('onRegisterError:', error);
  };

  const onRegisterSuccess = async (data: TransactionReceipt) => {
    setVisible(true);
    console.log(`Register transaction: https://mumbai.polygonscan.com/tx/${data.transactionHash}`);
  };

  const onFlowError = async (error: unknown) => {
    console.log('onFlowError:', error);
  };

  const onFlowSuccess = async (data: TransactionResponse) => {
    setVisible(false);
    console.log(`Flow transaction: https://mumbai.polygonscan.com/tx/${data.hash}`);
    await payment.writeAsync();
    setPaymentVisible(true);
  };

  const isLoading = useMemo<boolean>(() => {
    return Boolean(payment.isLoading || waitPayment.isLoading);
  }, [payment.isLoading, waitPayment.isLoading]);

  return (
    <Fragment>
      <NextHead>
        <title>Register | InsureFi - A decentralized car insurance</title>
      </NextHead>
      <RegisterHero />
      <RegisterForm
        onError={(error: Error) => onRegisterError(error)}
        onSuccess={(data: TransactionReceipt) => onRegisterSuccess(data)}
      />
      <FlowForm
        isVisible={isVisible}
        onError={(error) => onFlowError(error)}
        onSuccess={(data: TransactionResponse) => onFlowSuccess(data)}
      />
      <Modal open={isPaymentVisible} blur scroll closeButton aria-labelledby="payment-modal">
        <Modal.Header />
        <Modal.Body css={{ dflex: 'center' }}>
          {isLoading ? (
            <Loading color="currentColor" size="md" />
          ) : (
            <Text h1 size={32} weight="bold" css={{ textGradient: '45deg, $purple600 -20%, $pink600 100%' }}>
              You&rsquo;re insured!
            </Text>
          )}
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </Fragment>
  );
};

export default RegisterPage;
