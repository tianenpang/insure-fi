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
  }
});
