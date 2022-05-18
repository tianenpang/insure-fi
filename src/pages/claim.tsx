import { Fragment, useEffect, useMemo, useState } from 'react';
import { Button, Container, Grid, Input, Loading, Spacer, Text, Textarea } from '@nextui-org/react';
import { mergeProps } from '@react-aria/utils';
import { default as NextHead } from 'next/head';
import { useForm } from 'react-hook-form';
import { ClaimHero } from '@components';
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
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<ClaimFormData>();

  const [loading, setLoading] = useState(false);

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
    console.log('fileClaimHandler: ', data);
    if (isValid) {
      setLoading(true);
    }
  };

  return (
    <Fragment>
      <NextHead>
        <title>Claim - InsureFi a decentralized car insurance</title>
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
                type="date"
                aria-label="Date of Birth"
                labelPlaceholder="Date of Birth"
                color={errors.dateOfBirth && 'error'}
                {...mergeProps(inputItemProps, register('dateOfBirth', { required: true }))}
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
          </Grid.Container>
        </Container>
        <Container as="section" css={{ dflex: 'center', py: '$12', textAlign: 'center' }} gap={0} md>
          <Button type="submit" color="gradient" size="lg" auto ripple={false} css={{ width: '100%' }}>
            {loading ? <Loading color="currentColor" size="sm" /> : 'File Claim'}
          </Button>
        </Container>
      </form>
    </Fragment>
  );
};

interface ClaimFormData {
  lastName: string;
  policyId: string;
  dateOfBirth: string;
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
