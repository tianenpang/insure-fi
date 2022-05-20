import { Card, styled } from '@nextui-org/react';
import type { VariantProps } from '@nextui-org/react';

export const StyledCard = styled(Card, {
  py: '$md',
  dflex: 'center',
  borderStyle: 'dashed',
  borderColor: '$border',
  transition: '$background, $backgroundColor',
  variants: {
    isDragActive: {
      true: {
        bg: '$accents0'
      }
    }
  }
});

export type StyledCardVariantProps = VariantProps<typeof StyledCard>;
