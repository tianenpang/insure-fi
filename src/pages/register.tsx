import { Fragment, useMemo, useState } from 'react';
import { Col, Grid, Loading, Modal, Row, Text } from '@nextui-org/react';
import { default as NextHead } from 'next/head';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
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

  const { data: account } = useAccount();

  const insuree = useContractRead(registrationContractConfig, 'insuree', {
    args: [account?.address]
  });

  const payment = useContractWrite(registrationContractConfig, 'makePayment', {
    onSettled: async (_, error) => {
      error && console.log('payment onSettled error:', error);
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
    await insuree.refetch();
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
    return Boolean(payment.isLoading || waitPayment.isLoading || insuree.isLoading);
  }, [payment.isLoading, waitPayment.isLoading, insuree.isLoading]);

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
      <Modal open={isPaymentVisible} blur closeButton aria-labelledby="payment-modal">
        {typeof insuree.data === 'undefined' || isLoading ? (
          <Modal.Body css={{ dflex: 'center' }}>
            <Grid.Container css={{ p: 0 }} gap={4}>
              <Grid md={12} lg={12} justify="center" alignItems="center">
                <Loading color="currentColor" size="md" />
              </Grid>
            </Grid.Container>
          </Modal.Body>
        ) : (
          <Fragment>
            <Modal.Header>
              <Text size={24} b css={{ textGradient: '45deg, $purple600 -20%, $pink600 100%' }}>
                You&rsquo;re insured!
              </Text>
            </Modal.Header>
            <Modal.Body css={{ dflex: 'center' }}>
              <Grid.Container css={{ p: 0 }} gap={4}>
                <Grid md={12} lg={12}>
                  <Row>
                    <Col>Policy ID:</Col>
                    <Col>
                      <Text color="primary">{insuree.data[3]}</Text>
                    </Col>
                  </Row>
                </Grid>
                <Grid md={12} lg={12}>
                  <Row>
                    <Col>Car Make:</Col>
                    <Col>
                      <Text>{insuree.data[0]}</Text>
                    </Col>
                  </Row>
                </Grid>
                <Grid md={12} lg={12}>
                  <Row>
                    <Col>Car Model:</Col>
                    <Col>
                      <Text>{insuree.data[1]}</Text>
                    </Col>
                  </Row>
                </Grid>
                <Grid md={12} lg={12}>
                  <Row>
                    <Col>License Plate:</Col>
                    <Col>
                      <Text>{insuree.data[5]}</Text>
                    </Col>
                  </Row>
                </Grid>
              </Grid.Container>
            </Modal.Body>
            <Modal.Footer />
          </Fragment>
        )}
      </Modal>
    </Fragment>
  );
};

export default RegisterPage;
