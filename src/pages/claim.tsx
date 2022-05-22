import { Fragment, useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Grid, Input, Loading, Modal, Row, Spacer, Text, Textarea } from '@nextui-org/react';
import { mergeProps } from '@react-aria/utils';
import { default as NextHead } from 'next/head';
import { useForm } from 'react-hook-form';
import { useAccount, useContractWrite } from 'wagmi';
import { CarMakeTip, ClaimHero, DndUploader } from '@components';
import { useIpfsStorage } from '@hooks';
import claimsABI from '@lib/abi/Claims.json';
import type { GridProps, InputProps } from '@nextui-org/react';
import type { NextPage } from 'next';

const gridItemProps: GridProps = {
  xs: 12,
  md: 6,
  lg: 6
};

const inputItemProps: Partial<InputProps> = {
  fullWidth: true,
  underlined: true
};

const ClaimPage: NextPage = () => {
  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<ClaimFormData>();

  const { data: walletAccount } = useAccount();

  const startClaim = useContractWrite(
    {
      addressOrName: '0x92a5B68B469B726c2Ee71Ba80EbEd0f56c8Ad3E3',
      contractInterface: claimsABI
    },
    'startClaim',
    {
      onSuccess(data) {
        console.log('startClaim success: ', data);
      },
      onSettled(data, error) {
        console.log('startClaim settled: ', { data, error });
      },
      onError(error) {
        console.log('startClaim error: ', error);
      }
    }
  );

  const { store, isStoreLoading } = useIpfsStorage();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[] | undefined>(undefined);

  useEffect(() => {
    return () => {
      reset();
      setLoading(false);
    };
  }, [reset]);

  const currentYear = useMemo<number>(() => {
    return Number(new Date().getFullYear());
  }, []);

  const fileClaimHandler = async (data: ClaimFormData) => {
    console.log('fileClaimHandler: ', data, files, isValid);
    if (isValid) {
      setVisible(true);
    }
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const claimHandler = async () => {
    setLoading(true);
    startClaim.write({
      args: [
        {
          _lastName: getValues('lastName'),
          _policyID: getValues('policyId'),
          _yearsDriving: getValues('yearsDriving'),
          _age: getValues('age')
        }
      ]
    });
    const cid = await store({
      address: walletAccount?.address ?? '',
      policyID: getValues('policyId'),
      files
    });
    cid && console.log('fileClaimHandler: ', cid);
    cid && console.log('fileClaimHandler: ', `https://nftstorage.link/ipfs/${cid}`);
    setLoading(false);
  };

  const isClaiming = useMemo<boolean>(() => {
    return isStoreLoading && loading;
  }, [isStoreLoading, loading]);

  return (
    <Fragment>
      <NextHead>
        <title>Claim | InsureFi - A decentralized car insurance</title>
      </NextHead>
      <ClaimHero />
      <form onSubmit={handleSubmit(fileClaimHandler)}>
        <Container as="section" css={{ pt: '$12', textAlign: 'center' }} gap={0} md>
          <Text h2 size={36} weight="bold">
            Policy Information
          </Text>
          <Spacer y={4} />
          <Grid.Container css={{ p: '0px' }} gap={4} justify="center">
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="Last Name"
                labelPlaceholder="Last Name"
                color={errors.lastName && 'error'}
                {...mergeProps(inputItemProps, register('lastName', { required: true, maxLength: 20 }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="Policy ID"
                labelPlaceholder="Policy ID"
                color={errors.policyId && 'error'}
                {...mergeProps(inputItemProps, register('policyId', { required: true }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="number"
                aria-label="Age"
                labelPlaceholder="Age"
                color={errors.age && 'error'}
                {...mergeProps(inputItemProps, register('age', { required: true, min: 15, max: 100 }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="number"
                aria-label="Years Driving"
                labelPlaceholder="Years Driving"
                color={errors.yearsDriving && 'error'}
                {...mergeProps(inputItemProps, register('yearsDriving', { required: true, min: 0 }))}
              />
            </Grid>
          </Grid.Container>
        </Container>
        <Container as="section" css={{ py: '$20', textAlign: 'center' }} gap={0} md>
          <Text h2 size={36} weight="bold">
            Vehicle Information
          </Text>
          <Spacer y={4} />
          <CarMakeTip />
          <Spacer y={4} />
          <Grid.Container css={{ p: '0px' }} gap={4} justify="center">
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="Car Make"
                labelPlaceholder="Car Make"
                color={errors.carMake && 'error'}
                {...mergeProps(inputItemProps, register('carMake', { required: true, maxLength: 20 }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="Car Model"
                labelPlaceholder="Car Model"
                color={errors.carModel && 'error'}
                {...mergeProps(inputItemProps, register('carModel', { required: true, maxLength: 100 }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="number"
                aria-label="Car Year"
                labelPlaceholder="Car Year"
                color={errors.carYear && 'error'}
                {...mergeProps(inputItemProps, register('carYear', { required: true, min: currentYear - 50, max: currentYear }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="License Plate"
                labelPlaceholder="License Plate"
                color={errors.licensePlate && 'error'}
                {...mergeProps(inputItemProps, register('licensePlate', { required: true }))}
              />
            </Grid>
          </Grid.Container>
        </Container>
        <Container as="section" css={{ pb: '$20', textAlign: 'center' }} gap={0} md>
          <Text h2 size={36} weight="bold">
            Event Information
          </Text>
          <Spacer y={4} />
          <Grid.Container css={{ p: '0px' }} gap={4} justify="center">
            <Grid {...gridItemProps}>
              <Input
                type="date"
                aria-label="Date"
                labelPlaceholder="Date"
                color={errors.eventDate && 'error'}
                {...mergeProps(inputItemProps, register('eventDate', { required: true }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="time"
                aria-label="Time"
                labelPlaceholder="Time"
                color={errors.eventTime && 'error'}
                {...mergeProps(inputItemProps, register('eventTime', { required: true }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="Location"
                labelPlaceholder="Location"
                color={errors.eventLocation && 'error'}
                {...mergeProps(inputItemProps, register('eventLocation', { required: true }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Textarea
                type="text"
                minRows={2}
                maxRows={10}
                aria-label="Description"
                labelPlaceholder="Description"
                color={errors.eventDescription && 'error'}
                {...mergeProps(inputItemProps, register('eventDescription', { required: true, maxLength: 100 }))}
              />
            </Grid>
            <Grid {...gridItemProps} md={12} lg={12}>
              <DndUploader
                onChange={(files: File[] | undefined) => {
                  setFiles(files);
                }}
              />
            </Grid>
          </Grid.Container>
        </Container>
        <Container as="section" css={{ dflex: 'center', py: '$12', textAlign: 'center' }} gap={0} md>
          <Button type="submit" color="gradient" size="lg" auto ripple={false} css={{ width: '100%' }}>
            File Claim
          </Button>
        </Container>
      </form>
      <Modal open={visible} blur scroll closeButton aria-labelledby="flow-modal" onClose={() => closeHandler()}>
        <Modal.Header css={{ flexDirection: 'column' }}>
          <Text size={24} b>
            Paying out
          </Text>
          <Text>Your payout based on the information provided</Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container css={{ p: 0 }} gap={4}>
            <Grid {...gridItemProps} md={12} lg={12}>
              <Row>
                <Col>Age:</Col>
                <Col>{getValues('age')}</Col>
              </Row>
            </Grid>
            <Grid {...gridItemProps} md={12} lg={12}>
              <Row>
                <Col>Years Driving:</Col>
                <Col>{getValues('yearsDriving')}</Col>
              </Row>
            </Grid>
            <Grid {...gridItemProps} md={12} lg={12}>
              <Row>
                <Col>Date:</Col>
                <Col>{getValues('eventDate')}</Col>
              </Row>
            </Grid>
            <Grid {...gridItemProps} md={12} lg={12}>
              <Row>
                <Col>Car Make:</Col>
                <Col>{getValues('carMake')}</Col>
              </Row>
            </Grid>
            <Grid {...gridItemProps} md={12} lg={12}>
              <Row>
                <Col>Payout amount: x.x ETH ($xxx)</Col>
              </Row>
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" color="gradient" size="lg" auto ripple={false} css={{ width: '100%' }} onClick={() => claimHandler()}>
            {isClaiming ? <Loading color="currentColor" size="sm" /> : 'Payout'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

interface ClaimFormData {
  lastName: string;
  policyId: string;
  age: string;
  yearsDriving: number;
  carMake: string;
  carModel: string;
  carYear: number;
  licensePlate: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventDescription: string;
  eventFile: File[];
}

export default ClaimPage;
