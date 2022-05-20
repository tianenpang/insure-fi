import { styled } from '@nextui-org/react';

export const StyledHeader = styled('header', {
  us: 'none',
  zIndex: 'calc($max - 1)',
  background: 'transparent',
  position: 'sticky',
  top: 0
});

export const StyledNavContainer = styled('div', {
  size: '100%',
  display: 'flex',
  alignItems: 'center',
  variants: {
    showBlur: {
      true: {
        background: 'rgba(0, 0, 0, 0.5)'
      }
    },
    detached: {
      true: {
        backdropFilter: 'saturate(180%) blur(14px)',
        boxShadow: '0px 5px 20px -5px rgba(2, 1, 1, 0.1)'
      },
      false: {
        boxShadow: 'none',
        background: 'transparent'
      }
    }
  }
});
