import { createTheme, css } from '@nextui-org/react';

export const defaultTheme = createTheme({
  type: 'dark',
  theme: {
    fonts: {
      sans: 'Inter, SF Pro SC, SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
      mono: 'Inter, SF Pro SC, SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
    },
    colors: {
      background: '#0A051C',
      gradient: 'linear-gradient(90deg, #7421CF 0%, #911BB6 40%, #971AB2 70%, #D130C4 100%)'
    },
    transitions: {
      default: '$all',
      all: 'all 240ms cubic-bezier(0.37, 0, 0.63, 1)',
      button: '$background, $color, $borderColor, $boxShadow, $transform, $opacity',
      avatar: '$boxShadow, $opacity',
      link: '$opacity, $background, $color',
      card: '$transform',
      color: 'color 240ms cubic-bezier(0.37, 0, 0.63, 1)',
      opacity: 'opacity 240ms cubic-bezier(0.37, 0, 0.63, 1)',
      transform: 'transform 240ms cubic-bezier(0.37, 0, 0.63, 1)',
      boxShadow: 'box-shadow 240ms cubic-bezier(0.37, 0, 0.63, 1)',
      visibility: 'visibility 240ms cubic-bezier(0.37, 0, 0.63, 1)',
      background: 'background 240ms cubic-bezier(0.37, 0, 0.63, 1)',
      borderColor: 'border-color 240ms cubic-bezier(0.37, 0, 0.63, 1)',
      backgroundColor: 'background-color 240ms cubic-bezier(0.37, 0, 0.63, 1)',
      top: 'top 240ms cubic-bezier(0.37, 0, 0.63, 1)',
      left: 'left 240ms cubic-bezier(0.37, 0, 0.63, 1)',
      right: 'right 240ms cubic-bezier(0.37, 0, 0.63, 1)',
      bottom: 'bottom 240ms cubic-bezier(0.37, 0, 0.63, 1)'
    }
  }
});

export const cssFocusVisible = css({
  variants: {
    isFocusVisible: {
      true: {
        outlineOffset: '2px',
        outline: 'transparent solid 2px',
        boxShadow: '0 0 0 2px $colors$background, 0 0 0 4px $colors$primary'
      },
      false: {
        outline: 'none'
      }
    }
  }
});
