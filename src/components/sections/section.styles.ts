import { styled } from '@nextui-org/react';
import { default as NextImage } from 'next/image';
import type { VariantProps } from '@nextui-org/react';

export const StyledImage = styled(NextImage, {
  br: '$base'
});

export const StyledBlurCard = styled('div', {
  boxShadow: '$sm',
  br: '$base',
  display: 'flex',
  flexDirection: 'column',
  p: '$8',
  bf: 'saturate(180%) blur(14px)',
  bg: 'rgba(255, 255, 255, 0.05)'
});

export const StyledProcessCard = styled(StyledBlurCard, {
  transition: '$default',
  minWidth: '100%',
  '& .icon': {
    dflex: 'center',
    background: 'rgba(255, 255, 255, 0.05)',
    br: '$base',
    p: '$4'
  }
});

export type StyledImageVariantProps = VariantProps<typeof StyledImage>;
