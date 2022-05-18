import { Fragment, useEffect, useMemo, useState } from 'react';
import { Button, Container, Grid, Input, Loading, Radio, Spacer, Text } from '@nextui-org/react';
import { mergeProps } from '@react-aria/utils';
import { default as NextHead } from 'next/head';
import { useForm } from 'react-hook-form';
import { RegisterHero } from '@components';
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

const RegisterPage: NextPage = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<RegistrationFormData>();

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

  const registrationHandler = async (data: RegistrationFormData) => {
    console.log('registrationHandler: ', data);
    if (isValid) {
      setLoading(true);
    }
  };

  return (
    <Fragment>
      <NextHead>
        <title>Register | InsureFi - A decentralized car insurance</title>
      </NextHead>
      <RegisterHero />
      <form onSubmit={handleSubmit(registrationHandler)}>
        <Container as="section" css={{ pt: '$12', textAlign: 'center' }} gap={0} md>
          <Text h2 size={36} weight="bold">
            Personal Information
          </Text>
          <Spacer y={4} />
          <Grid.Container css={{ p: '0px' }} gap={4} justify="center">
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="First Name"
                labelPlaceholder="First Name"
                color={errors.firstName && 'error'}
                {...mergeProps(inputItemProps, register('firstName', { required: true, maxLength: 20 }))}
              />
            </Grid>
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
                type="date"
                aria-label="Date of Birth"
                labelPlaceholder="Date of Birth"
                color={errors.dateOfBirth && 'error'}
                {...mergeProps(inputItemProps, register('dateOfBirth', { required: true }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Radio.Group
                row
                aria-label="Gender radio"
                // color={errors.gender && 'error'}
                // {...mergeProps(register('gender', { required: true }))}
              >
                <Radio value="male">Male</Radio>
                <Spacer />
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="Address"
                labelPlaceholder="Address"
                color={errors.address && 'error'}
                {...mergeProps(inputItemProps, register('address', { required: true }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="City"
                labelPlaceholder="City"
                color={errors.city && 'error'}
                {...mergeProps(inputItemProps, register('city', { required: true }))}
              />
            </Grid>
            <Grid xs={6} md={3} lg={3}>
              <Input
                type="text"
                aria-label="State"
                labelPlaceholder="State"
                color={errors.state && 'error'}
                {...mergeProps(inputItemProps, register('state', { required: true }))}
              />
            </Grid>
            <Grid xs={6} md={3} lg={3}>
              <Input
                type="text"
                aria-label="Zip Code"
                labelPlaceholder="Zip Code"
                color={errors.zipCode && 'error'}
                {...mergeProps(inputItemProps, register('zipCode', { required: true }))}
              />
            </Grid>
            <Grid xs={12} md={6} lg={6}>
              <Input
                type="text"
                aria-label="Country"
                labelPlaceholder="Country"
                color={errors.country && 'error'}
                {...mergeProps(inputItemProps, register('country', { required: true }))}
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
                type="number"
                aria-label="Mileage"
                labelPlaceholder="Mileage"
                color={errors.mileage && 'error'}
                {...mergeProps(inputItemProps, register('mileage', { required: true }))}
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
            <Grid {...gridItemProps}>
              <Input
                type="text"
                aria-label="Years Driving"
                labelPlaceholder="Years Driving"
                color={errors.yearsDriving && 'error'}
                {...mergeProps(inputItemProps, register('yearsDriving', { required: true }))}
              />
            </Grid>
          </Grid.Container>
        </Container>
        <Container as="section" css={{ dflex: 'center', py: '$12', textAlign: 'center' }} gap={0} md>
          <Button type="submit" color="gradient" size="lg" auto ripple={false} css={{ width: '100%' }}>
            {loading ? <Loading color="currentColor" size="sm" /> : 'Make Payment'}
          </Button>
        </Container>
      </form>
    </Fragment>
  );
};

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  carMake: string;
  carModel: string;
  carYear: number;
  mileage: number;
  licensePlate: string;
  yearsDriving: number;
}

export default RegisterPage;
