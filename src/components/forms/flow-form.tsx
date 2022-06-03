import { Fragment, useState } from 'react';
import { Button, Grid, Input, Loading, Modal, Text } from '@nextui-org/react';
import { mergeProps } from '@react-aria/utils';
import { Framework } from '@superfluid-finance/sdk-core';
import { useForm } from 'react-hook-form';
import { useNetwork, useProvider, useSigner } from 'wagmi';
import type { TransactionResponse } from '@ethersproject/providers';
import type { GridProps, InputProps } from '@nextui-org/react';
import type { Signer } from 'ethers';
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

export const FlowForm: FC<FlowFormProps> = (props: FlowFormProps) => {
  const { isVisible, onError, onSuccess } = props;

  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<FlowFormData>({ mode: 'onChange' });

  const provider = useProvider();
  const { activeChain } = useNetwork();
  const { data: signer } = useSigner();

  const [isLoading, setLoading] = useState<boolean>(false);

  const createFlowHandler = async (data: FlowFormData) => {
    if (isValid) {
      setLoading(true);
      const { recipient, flowRate } = data;
      const sf = await Framework.create({
        provider: provider,
        chainId: activeChain?.id ?? 80001
      });
      const MATICxContract = await sf.loadSuperToken('MATICx');
      try {
        const createFlowOperation = sf.cfaV1.createFlow({
          flowRate: flowRate,
          receiver: recipient,
          superToken: MATICxContract.address
        });
        const data = await createFlowOperation.exec(signer as Signer);
        await onSuccess(data);
      } catch (error) {
        await onError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Fragment>
      <Modal open={isVisible} blur closeButton aria-labelledby="create-flow-modal">
        <form onSubmit={handleSubmit(createFlowHandler)}>
          <Modal.Header>
            <Text size={24} b>
              Create Flow
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Grid.Container css={{ p: 0 }} gap={4}>
              <Grid {...gridItemProps} md={12} lg={12}>
                <Input
                  type="text"
                  aria-label="Recipient"
                  labelPlaceholder="Recipient"
                  color={errors.recipient && 'error'}
                  {...mergeProps(inputItemProps, register('recipient', { required: true }))}
                />
              </Grid>
              <Grid {...gridItemProps} md={12} lg={12}>
                <Input
                  type="text"
                  aria-label="Flow rate"
                  labelPlaceholder="Flow rate"
                  color={errors.flowRate && 'error'}
                  {...mergeProps(inputItemProps, register('flowRate', { required: true }))}
                />
              </Grid>
            </Grid.Container>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" color="gradient" size="lg" auto ripple={false} css={{ width: '100%' }}>
              {isLoading ? <Loading color="currentColor" size="sm" /> : 'Create Flow'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};

interface FlowFormData {
  flowRate: string;
  recipient: string;
}

interface FlowFormProps {
  isVisible: boolean;
  onError: (error: unknown) => Promise<void>;
  onSuccess: (data: TransactionResponse) => Promise<void>;
}
