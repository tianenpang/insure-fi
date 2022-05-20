import { motion } from 'framer-motion';
import type { ComponentProps } from 'react';

const OverlayAnimation: ComponentProps<typeof motion.div> = {
  initial: 'closed',
  animate: 'open',
  exit: 'closed',
  variants: {
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: [0.36, 0.66, 0.04, 1]
      }
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.36, 0.66, 0.04, 1]
      }
    }
  }
};

const SideNavAnimation: ComponentProps<typeof motion.div> = {
  initial: {
    x: -260,
    opacity: 0.8
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.32, 0.72, 0, 1]
    }
  },
  exit: {
    x: -260,
    opacity: 0.9,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1]
    }
  }
};

export const commonMotion = {
  overlay: OverlayAnimation
};

export const navMotion = {
  sideMenu: SideNavAnimation
};
