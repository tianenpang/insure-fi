import { styled } from '@nextui-org/react';

export const StyledTitle = styled('h1', {
  display: 'inline',
  fontWeight: '$bold',
  color: '$text',
  lh: '1.2',
  fs: '2.5rem',
  '@sm': {
    fs: '3rem'
  },
  '@lg': {
    fs: '3.5rem'
  }
});

export const StyledGradientTitle = styled(StyledTitle, {
  textGradient: '180deg, #FF1CF7 25%, #b249f8 100%',
  '&::selection': {
    WebkitTextFillColor: '$colors$text'
  }
});

export const StyledSubtitle = styled('p', {
  pl: '$1',
  fs: '$sm',
  width: '100%',
  display: 'inline-flex',
  fontWeight: '$medium',
  color: '$accents7'
});

export const StyledImageContainer = styled('div', {
  size: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  position: 'absolute',
  zIndex: '$max',
  '@xsMax': {
    display: 'none'
  }
});

export const StyledGradientBackground = styled('div', {
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  background: 'radial-gradient(95% 75% at 50% 100%, #0B0B45 0%, rgb(0, 0, 0) 100%)'
});
