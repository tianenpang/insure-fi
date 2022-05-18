import { styled } from '@nextui-org/react';

export const StyledContainer = styled('div', {
  defaultVariants: {
    mounted: false
  },
  variants: {
    mounted: {
      true: {},
      false: {
        opacity: 0,
        userSelect: 'none',
        pointerEvents: 'none'
      }
    }
  }
});

export const StyledConnectedContainer = styled('div', {
  display: 'flex'
});
