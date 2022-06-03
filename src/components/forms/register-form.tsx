import { Fragment, useEffect, useMemo, useState } from 'react';
import { Button, Container, Grid, Input, Loading, Radio, Spacer, Text } from '@nextui-org/react';
import { mergeProps } from '@react-aria/utils';
import { useForm } from 'react-hook-form';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { CarMakeTip } from '@components/car-make-tip';
import registerABI from '@lib/abi/Registration.json';
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

const registrationContractConfig = {
  addressOrName: '0x92a5B68B469B726c2Ee71Ba80EbEd0f56c8Ad3E3',
  contractInterface: registerABI
};

export const RegisterForm: FC<RegisterFormProps> = (props: RegisterFormProps) => {
  const { onError, onSuccess } = props;

  const [errorReason, setErrorReason] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      errorReason && setErrorReason(undefined);
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorReason]);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<RegistrationFormData>({ mode: 'onChange' });

  const registration = useContractWrite(registrationContractConfig, 'registerCar', {
    onSettled: async (_, error) => {
      if (error) {
        const reason = (error as unknown as { reason: string }).reason;
        const reasonString = reason.split(':')[1];
        setErrorReason(reasonString);
        await onError(error);
      }
    }
  });

  const waitRegistration = useWaitForTransaction({
    wait: registration.data?.wait,
    hash: registration.data?.hash,
    onSuccess: async (data: TransactionReceipt) => {
      await onSuccess(data);
    }
  });

  const registerHandler = async (data: RegistrationFormData) => {
    if (isValid) {
      const { carMake, carModel, carYear, mileage, licensePlate } = data;
      try {
        await registration.writeAsync({
          args: [carMake, carModel, carYear, mileage, licensePlate]
        });
      } catch (error) {
        return;
      }
    }
  };

  const currentYear = useMemo<number>(() => Number(new Date().getFullYear()), []);

  const isLoading = useMemo<boolean>(() => {
    return Boolean(registration.isLoading || waitRegistration.isLoading);
  }, [registration.isLoading, waitRegistration.isLoading]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(registerHandler)}>
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
                {...mergeProps(inputItemProps, register('firstName', { required: true, minLength: 1, maxLength: 30 }))}
              />
            </Grid>
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
                aria-label="Age"
                labelPlaceholder="Age"
                color={errors.age && 'error'}
                {...mergeProps(inputItemProps, register('age', { required: true, min: 16, max: 100 }))}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <Radio.Group row aria-label="Gender radio" color="secondary">
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
                type="number"
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
                type="number"
                aria-label="Mileage"
                labelPlaceholder="Mileage"
                color={errors.mileage && 'error'}
                {...mergeProps(inputItemProps, register('mileage', { required: true, min: 1 }))}
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
                type="number"
                aria-label="Years Driving"
                labelPlaceholder="Years Driving"
                color={errors.yearsDriving && 'error'}
                {...mergeProps(inputItemProps, register('yearsDriving', { required: true, maxLength: 50 }))}
              />
            </Grid>
          </Grid.Container>
        </Container>
        <Container as="section" css={{ dflex: 'center', py: '$12', textAlign: 'center' }} gap={0} md>
          <Button type="submit" color={errorReason ? 'error' : 'gradient'} size="lg" auto ripple={false} css={{ width: '100%' }}>
            {isLoading ? <Loading color="currentColor" size="sm" /> : errorReason ? errorReason : 'Make Payment'}
          </Button>
        </Container>
      </form>
    </Fragment>
  );
};

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  age: number;
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

interface RegisterFormProps {
  onError: (error: Error) => Promise<void>;
  onSuccess: (data: TransactionReceipt) => Promise<void>;
}
