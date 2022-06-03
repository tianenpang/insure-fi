import { Fragment, useMemo, useState } from 'react';
import { Button, Grid, Input, Loading, Modal, Text } from '@nextui-org/react';
import { mergeProps } from '@react-aria/utils';
import { useForm } from 'react-hook-form';
import { useContractRead } from 'wagmi';
import { CarMakeTip } from '@components/car-make-tip';
import registerABI from '@lib/abi/Registration.json';
import type { GridProps, InputProps } from '@nextui-org/react';
import type { FC } from 'react';

const gridItemProps: GridProps = {
  xs: 12,
  md: 12,
  lg: 12
};

const inputItemProps: Partial<InputProps> = {
  fullWidth: true,
  underlined: true
};

export const QuoteModal: FC<QuoteModalProps> = (props: QuoteModalProps) => {
  const {} = props;

  const {
    reset,
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<QuoteFormData>();

  const contractRead = useContractRead(
    {
      addressOrName: '0x92a5B68B469B726c2Ee71Ba80EbEd0f56c8Ad3E3',
      contractInterface: registerABI
    },
    'getCost'
  );

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentYear = useMemo<number>(() => {
    return Number(new Date().getFullYear());
  }, []);

  const openHandler = async () => {
    setVisible(true);
  };

  const closeHandler = () => {
    reset();
    setVisible(false);
    setLoading(false);
  };

  const getQuoteHandler = async (data: QuoteFormData) => {
    console.log('getQuoteHandler: ', data);
    if (isValid) {
      setLoading(true);
      contractRead.refetch();
      console.log(contractRead);
    }
    setLoading(true);
  };

  return (
    <Fragment>
      <Button
        type="button"
        color="gradient"
        size="lg"
        auto
        ripple={false}
        onClick={() => openHandler()}
        css={{ maxHeight: '$space$14', '@smMax': { marginBottom: '$8' }, '@xsMax': { width: '100%', marginBottom: '$8' } }}
      >
        Get Quote
      </Button>
      <Modal open={visible} blur closeButton aria-labelledby="get-quote-modal" onClose={() => closeHandler()}>
        <form onSubmit={handleSubmit(getQuoteHandler)}>
          <Modal.Header>
            <Text size={24} b>
              Get Quote
            </Text>
          </Modal.Header>
          <CarMakeTip />
          <Modal.Body>
            <Grid.Container css={{ p: 0 }} gap={4}>
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
                  {...mergeProps(inputItemProps, register('carModel', { required: true, maxLength: 20 }))}
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
                  labelRight="Mile"
                  aria-label="Mileage"
                  labelPlaceholder="Mileage"
                  color={errors.mileage && 'error'}
                  {...mergeProps(inputItemProps, register('mileage', { required: true, min: 1 }))}
                />
              </Grid>
            </Grid.Container>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" color="gradient" size="lg" auto ripple={false} css={{ width: '100%' }}>
              {loading ? <Loading color="currentColor" size="sm" /> : 'Get Quote'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};

interface QuoteModalProps {}

interface QuoteFormData {
  carMake: string;
  carModel: string;
  carYear: number;
  mileage: number;
}
