import { Fragment, useMemo, useState } from 'react';
import { Button, Col, Grid, Loading, Modal, Row, Text } from '@nextui-org/react';
import { ethers } from 'ethers';
import { default as NextHead } from 'next/head';
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { ClaimForm, ClaimHero } from '@components';
import claimABI from '@lib/abi/Claims.json';
import type { ClaimFormData } from '@components';
import type { TransactionReceipt } from '@ethersproject/providers';
import type { NextPage } from 'next';

const claimContractConfig = {
  addressOrName: '0x92a5B68B469B726c2Ee71Ba80EbEd0f56c8Ad3E3',
  contractInterface: claimABI
};

const ClaimPage: NextPage = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<TransactionReceipt & ClaimFormData>();

  const getClaim = useContractRead(claimContractConfig, 'getClaims');

  const payout = useContractWrite(claimContractConfig, 'makePayout', {
    onSettled: async (_, error) => {
      error && console.log('Payout onSettled error:', error);
    }
  });

  const waitPayout = useWaitForTransaction({
    wait: payout.data?.wait,
    hash: payout.data?.hash,
    onSuccess: async (data: TransactionReceipt) => {
      setVisible(false);
      console.log(`Payout transaction: https://mumbai.polygonscan.com/tx/${data.transactionHash}`);
    }
  });

  const onClaimError = async (error: Error) => {
    console.log('onClaimError:', error);
  };

  const onClaimSuccess = async (data: TransactionReceipt & ClaimFormData) => {
    setData(data);
    setVisible(true);
    await getClaim.refetch();
    console.log(`Claim transaction: https://mumbai.polygonscan.com/tx/${data.transactionHash}`);
  };

  const payoutHandler = async () => {
    await payout.writeAsync();
  };

  const isLoading = useMemo<boolean>(() => {
    return Boolean(payout.isLoading || waitPayout.isLoading);
  }, [payout.isLoading, waitPayout.isLoading]);

  return (
    <Fragment>
      <NextHead>
        <title>Claim | InsureFi - A decentralized car insurance</title>
      </NextHead>
      <ClaimHero />
      <ClaimForm
        onError={(error: Error) => onClaimError(error)}
        onSuccess={(data: TransactionReceipt & ClaimFormData) => onClaimSuccess(data)}
      />
      <Modal open={isVisible} blur closeButton aria-labelledby="payout-modal">
        <Modal.Header css={{ flexDirection: 'column' }}>
          <Text size={24} b>
            Paying out
          </Text>
          <Text>Your payout based on the information provided</Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container css={{ p: 0 }} gap={4}>
            <Grid md={12} lg={12}>
              <Row>
                <Col>Age:</Col>
                <Col>
                  <Text>{data?.age}</Text>
                </Col>
              </Row>
            </Grid>
            <Grid md={12} lg={12}>
              <Row>
                <Col>Years Driving:</Col>
                <Col>
                  <Text>{data?.yearsDriving}</Text>
                </Col>
              </Row>
            </Grid>
            <Grid md={12} lg={12}>
              <Row>
                <Col>Date:</Col>
                <Col>
                  <Text>{data?.eventDate}</Text>
                </Col>
              </Row>
            </Grid>
            <Grid md={12} lg={12}>
              <Row>
                <Col>Car Make:</Col>
                <Col>
                  <Text>{data?.carMake}</Text>
                </Col>
              </Row>
            </Grid>
            <Grid md={12} lg={12}>
              <Row>
                <Col>Payout amount:</Col>
                <Col>
                  {typeof getClaim.data === 'undefined' || getClaim.isLoading ? (
                    <Loading color="currentColor" size="sm" />
                  ) : (
                    <Text color="primary">{(+ethers.utils.formatEther(getClaim.data)).toFixed(2)} ETH</Text>
                  )}
                </Col>
              </Row>
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" color="gradient" size="lg" auto ripple={false} css={{ width: '100%' }} onClick={() => payoutHandler()}>
            {isLoading ? <Loading color="currentColor" size="sm" /> : 'Payout'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ClaimPage;
