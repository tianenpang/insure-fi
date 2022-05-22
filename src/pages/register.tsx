import { Fragment, useEffect, useMemo, useState } from 'react';
import { Button, Container, Grid, Input, Loading, Modal, Radio, Spacer, Text } from '@nextui-org/react';
import { mergeProps } from '@react-aria/utils';
import { Framework } from '@superfluid-finance/sdk-core';
import { default as NextHead } from 'next/head';
import { useForm } from 'react-hook-form';
import { useContractWrite, useNetwork, useProvider, useSigner } from 'wagmi';
import { CarMakeTip, RegisterHero } from '@components';
import registerABI from '@lib/abi/Registration.json';
import type { GridProps, InputProps } from '@nextui-org/react';
import type { Signer } from 'ethers';
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

  const {
    register: flowFormRegister,
    handleSubmit: flowFormHandleSubmit,
    formState: { isValid: flowFormIsValid, errors: flowFormErrors }
  } = useForm<CreateFlowFormData>();

  const [cardInfo, setCardInfo] = useState<RegistrationFormData | undefined>(undefined);
  const [visible, setVisible] = useState(false);
  const [createFlowSuccess, setCreateFlowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const provider = useProvider();
  const { activeChain } = useNetwork();
  const { data: signer } = useSigner();
  const registerCarData = useContractWrite(
    {
      addressOrName: '0x92a5B68B469B726c2Ee71Ba80EbEd0f56c8Ad3E3',
      contractInterface: registerABI
    },
    'registerCar'
  );

  useEffect(() => {
    return () => {
      reset();
      setLoading(false);
    };
  }, [reset]);

  const createNewFlow = async (recipient: string, flowRate: string) => {
    // is same as here
    const sf = await Framework.create({
      provider: provider,
      chainId: activeChain!.id
    });

    const MATICxContract = await sf.loadSuperToken('MATICx');
    const MATICx = MATICxContract.address;

    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        flowRate: flowRate,
        receiver: recipient,
        superToken: MATICx
      });

      console.log('Creating stream...');

      const result = await createFlowOperation.exec(signer as Signer);
      console.log(result);

      console.log(
        `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
    Network: ${activeChain!.id}
    Super Token: MATICx
    Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
    Receiver: ${recipient},
    FlowRate: ${flowRate}
    `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  };

  const makePaymentHandler = async (data: RegistrationFormData) => {
    console.log('registrationHandler: ', data, isValid, errors);
    setCardInfo(data);
    setVisible(true);
    console.log('setVisible', visible);
    // if (isValid)
  };

  const createFlowHandler = async (data: CreateFlowFormData) => {
    console.log('registrationHandler: ', data);
    if (flowFormIsValid && cardInfo) {
      setLoading(true);
      const { recipient, flowRate } = data;
      await createNewFlow(recipient, flowRate);
      registerCarData.write({
        args: [
          {
            _carMake: cardInfo.carMake,
            _carModel: cardInfo.carModel,
            _carYear: cardInfo.carYear,
            _mileage: cardInfo.mileage,
            _licensePlate: cardInfo.licensePlate
          }
        ]
      });
      console.log('registerCarData: ', registerCarData);
      setCreateFlowSuccess(true);
    }
    setLoading(false);
  };

  const currentYear = useMemo<number>(() => {
    return Number(new Date().getFullYear());
  }, []);

  const closeHandler = () => {
    setVisible(false);
    setLoading(false);
  };

  return (
    <Fragment>
      <NextHead>
        <title>Register | InsureFi - A decentralized car insurance</title>
      </NextHead>
      <RegisterHero />
      <form onSubmit={handleSubmit(makePaymentHandler)}>
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
      {visible && (
        <Modal open={visible} blur scroll closeButton aria-labelledby="flow-modal" onClose={() => closeHandler()}>
          <form onSubmit={flowFormHandleSubmit(createFlowHandler)}>
            <Modal.Header>
              <Text size={24} b>
                Create Flow
              </Text>
            </Modal.Header>
            <CarMakeTip />
            <Modal.Body>
              <Grid.Container css={{ p: 0 }} gap={4}>
                <Grid {...gridItemProps} md={12} lg={12}>
                  <Input
                    type="text"
                    aria-label="Recipient"
                    labelPlaceholder="Recipient"
                    color={flowFormErrors.recipient && 'error'}
                    {...mergeProps(inputItemProps, flowFormRegister('recipient', { required: true, maxLength: 20 }))}
                  />
                </Grid>
                <Grid {...gridItemProps} md={12} lg={12}>
                  <Input
                    type="text"
                    aria-label="Flow rate"
                    labelPlaceholder="Flow rate"
                    color={flowFormErrors.flowRate && 'error'}
                    {...mergeProps(inputItemProps, flowFormRegister('flowRate', { required: true, maxLength: 20 }))}
                  />
                </Grid>
              </Grid.Container>
              {createFlowSuccess && <Text color="success">Flow has been created</Text>}
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" color="gradient" size="lg" auto ripple={false} css={{ width: '100%' }}>
                {loading ? <Loading color="currentColor" size="sm" /> : 'Create Flow'}
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      )}
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

interface CreateFlowFormData {
  recipient: string;
  flowRate: string;
}

export default RegisterPage;
