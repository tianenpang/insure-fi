import { globalCss } from '@nextui-org/react';

export const globalStyles = globalCss({
  '@font-face': {
    fontWeight: 400,
    fontStyle: 'normal',
    fontFamily: 'Inter',
    fontDisplay: 'optional',
    src: "url('/assets/fonts/Inter.woff2') format('woff2')"
  },
  'html, body, #__next': {
    width: '100%'
  },
  '.nextui-backdrop .nextui-backdrop-layer-blur': {
    backdropFilter: 'saturate(100%) blur(20px)'
  },
  '._9pm4ki3': {
    backdropFilter: 'saturate(100%) blur(20px)'
  },
  'div[data-rk]': {
    lineHeight: 1,
    userSelect: 'none',
    '.ju367v15, .ju367v12, .ju367v11': {
      borderRadius: '12px'
    },
    '.ju367v87': {
      paddingTop: '24px'
    },
    '.ju367v7n': {
      paddingRight: '24px'
    },
    '.ju367v73': {
      paddingLeft: '24px'
    },
    '.ju367v6j': {
      paddingBottom: '24px'
    },
    '.ju367v7o': {
      paddingRight: '24px'
    },
    '.ju367v74': {
      paddingLeft: '24px'
    },
    '.ju367v6g': {
      paddingBottom: '24px'
    },
    '.ju367v20': {
      gap: '24px'
    },
    '.ju367v1u': {
      gap: '16px'
    },
    '.ju367v1z': {
      gap: '16px'
    }
  }
});
