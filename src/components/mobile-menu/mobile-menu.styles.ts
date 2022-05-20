import { styled } from '@nextui-org/react';
import { motion } from 'framer-motion';

export const StyledSideNavContent = styled(motion.div, {
  $$sideNav: '16.25rem',
  zIndex: '$max',
  size: '100%',
  maxWidth: '$$sideNav',
  padding: '$8 $8 $16 $16',
  borderTopRightRadius: '$base',
  borderBottomRightRadius: '$base',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  gap: '$md',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  boxShadow: '$md',
  background: '$background',
  transition: '$background',
  '@xs': {
    display: 'none'
  }
});

export const StyledNav = styled('nav', {
  display: 'flex',
  gap: 'calc($space$md * 2)',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
});

export const StyledSideNavOverlay = styled(motion.div, {
  inset: 0,
  zIndex: 'calc($max - 1)',
  position: 'fixed',
  transition: '$background',
  background: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'saturate(100%) blur(20px)',
  '@xs': {
    display: 'none'
  }
});
