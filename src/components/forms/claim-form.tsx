import { Fragment, useMemo, useState } from 'react';
import { Button, Container, Grid, Input, Loading, Spacer, Text } from '@nextui-org/react';
import { mergeProps } from '@react-aria/utils';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { CarMakeTip } from '@components/car-make-tip';
import { DndUploader } from '@components/dnd-uploader';
import { useIpfsStorage } from '@hooks';
import claimABI from '@lib/abi/Claims.json';
import type { TransactionReceipt } from '@ethersproject/providers';
import type { GridProps, InputProps } from '@nextui-org/react';
import type { FC } from 'react';

const gridItemProps: GridProps = {
  xs: 12,
  md: 6,
  lg: 6
};

const inputItemProps: Partial<InputProps> = {
  fullWidth: true,
  underlined: true
};

const claimContractConfig = {
  addressOrName: '0x92a5B68B469B726c2Ee71Ba80EbEd0f56c8Ad3E3',
  contractInterface: claimABI
};

export const ClaimForm: FC<ClaimFormProps> = (props: ClaimFormProps) => {
  const { onError, onSuccess } = props;

  const [files, setFiles] = useState<File[] | undefined>(undefined);

  const { data: walletAccount } = useAccount();
  const { store, isStoreLoading } = useIpfsStorage();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<ClaimFormData>({ mode: 'onChange' });

  const claim = useContractWrite(claimContractConfig, 'startClaim', {
    onSettled: async (_, error) => {
      error && (await onError(error));
    }
  });

  const waitClaim = useWaitForTransaction({
    wait: claim.data?.wait,
    hash: claim.data?.hash,
    onSuccess: async (data: TransactionReceipt) => {
      await onSuccess({ ...data, ...getValues() });
    }
  });

  const claimHandler = async (data: ClaimFormData) => {
    if (isValid) {
      const { lastName, policyId, yearsDriving, age } = data;
      const folderCID = await store({
        files,
        policyID: policyId,
        address: walletAccount?.address
      });
      folderCID && console.log(`IPFS address: https://nftstorage.link/ipfs/${folderCID}`);
      await claim.writeAsync({
        args: [lastName, policyId, yearsDriving, age]
      });
    }
  };

  const onFileChangeHandler = async (files: File[] | undefined) => {
    setFiles(files);
  };

  const currentYear = useMemo<number>(() => Number(new Date().getFullYear()), []);

  const isLoading = useMemo<boolean>(() => {
    return Boolean(claim.isLoading || waitClaim.isLoading || isStoreLoading);
  }, [claim.isLoading, waitClaim.isLoading, isStoreLoading]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(claimHandler)}>
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
                {...mergeProps(inputItemProps, register('lastName', { required: true, minLength: 1, maxLength: 30 }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="number"
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
                {...mergeProps(inputItemProps, register('age', { required: true, min: 16, max: 100 }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="number"
                aria-label="Years Driving"
                labelPlaceholder="Years Driving"
                color={errors.yearsDriving && 'error'}
                {...mergeProps(inputItemProps, register('yearsDriving', { required: true }))}
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
                {...mergeProps(inputItemProps, register('carMake', { required: true, maxLength: 50 }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="Car Model"
                labelPlaceholder="Car Model"
                color={errors.carModel && 'error'}
                {...mergeProps(inputItemProps, register('carModel', { required: true, maxLength: 50 }))}
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
                initialValue={format(new Date(), 'yyyy-MM-dd')}
                {...mergeProps(inputItemProps, register('eventDate', { required: true }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="time"
                aria-label="Time"
                labelPlaceholder="Time"
                color={errors.eventTime && 'error'}
                initialValue={format(new Date(), 'HH:mm')}
                {...mergeProps(inputItemProps, register('eventTime', { required: true }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="Location"
                labelPlaceholder="Location"
                color={errors.eventLocation && 'error'}
                {...mergeProps(inputItemProps, register('eventLocation', { required: true, maxLength: 200 }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="Description"
                labelPlaceholder="Description"
                color={errors.eventDescription && 'error'}
                {...mergeProps(inputItemProps, register('eventDescription', { required: true, maxLength: 200 }))}
              />
            </Grid>
            <Grid {...gridItemProps} md={12} lg={12}>
              <DndUploader onChange={(files: File[] | undefined) => onFileChangeHandler(files)} />
            </Grid>
          </Grid.Container>
        </Container>
        <Container as="section" css={{ dflex: 'center', py: '$12', textAlign: 'center' }} gap={0} md>
          <Button type="submit" color="gradient" size="lg" auto ripple={false} css={{ width: '100%' }}>
            {isLoading ? <Loading color="currentColor" size="sm" /> : ' File Claim'}
          </Button>
        </Container>
      </form>
    </Fragment>
  );
};

export interface ClaimFormData {
  lastName: string;
  policyId: number;
  age: number;
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

interface ClaimFormProps {
  onError: (error: Error) => Promise<void>;
  onSuccess: (data: TransactionReceipt & ClaimFormData) => Promise<void>;
}
