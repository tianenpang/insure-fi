import { midnightTheme } from '@rainbow-me/rainbowkit';
import type { Theme } from '@rainbow-me/rainbowkit';

export const useRainbowTheme = (): Theme => {
  const { colors } = midnightTheme();

  return {
    colors: {
      ...colors,
      accentColor: '#D139C3',
      accentColorForeground: '#FFFFFF',
      actionButtonSecondaryBackground: 'rgba(255, 255, 255, 0.08)',
      closeButton: '#F5F5F5',
      closeButtonBackground: '#333333',
      connectButtonBackgroundError: '#F31260',
      connectionIndicator: '#17C964',
      error: '#F31260',
      menuItemBackground: '#333333',
      modalBackdrop: 'rgba(0, 0, 0, 0.5)',
      modalBackground: '#161616',
      profileAction: '#161616',
      profileActionHover: '#333333',
      profileForeground: '#161616',
      standby: '#F5A524'
    },
    fonts: {
      body: 'Inter, SF Pro SC, SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
    },
    radii: {
      actionButton: '12px',
      connectButton: '12px',
      menuButton: '12px',
      modal: '12px',
      modalMobile: '12px'
    },
    shadows: {
      connectButton: '0 4px 14px 0 rgba(20, 20, 20, 0.15)',
      dialog: '0 8px 30px rgba(20, 20, 20, 0.15)',
      profileDetailsAction: '0 8px 30px rgba(20, 20, 20, 0.15)',
      selectedOption: '0 8px 30px rgba(20, 20, 20, 0.15)',
      selectedWallet: '0 8px 30px rgba(20, 20, 20, 0.15)',
      walletLogo: '0 8px 30px rgba(20, 20, 20, 0.15)'
    },
    blurs: {
      modalOverlay: 'saturate(100%) blur(20px)'
    }
  };
};
