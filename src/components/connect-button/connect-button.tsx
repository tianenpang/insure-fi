import { Fragment } from 'react';
import { Button, Spacer } from '@nextui-org/react';
import { ConnectButton as RainbowButton } from '@rainbow-me/rainbowkit';
import { default as NextImage } from 'next/image';
import { Wallet } from 'react-iconly';
import { useMediaQuery } from '@hooks';
import { StyledConnectedContainer, StyledContainer } from './connect-button.styles';
import type { FC } from 'react';

export const ConnectButton: FC<ConnectButtonProps> = (props: ConnectButtonProps) => {
  const {} = props;

  const isMobile = useMediaQuery(650);

  return (
    <Fragment>
      <RainbowButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
          return (
            <StyledContainer mounted={mounted} aria-hidden={!mounted}>
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <Button
                      type="button"
                      color="gradient"
                      auto
                      bordered
                      ripple={false}
                      icon={<Wallet primaryColor="currentColor" set="curved" />}
                      onClick={() => openConnectModal()}
                    >
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button type="button" color="error" auto bordered ripple={false} onClick={() => openChainModal()}>
                      Wrong network
                    </Button>
                  );
                }

                return (
                  <StyledConnectedContainer css={{ flexShrink: 0 }}>
                    <Button
                      type="button"
                      color="gradient"
                      auto
                      bordered
                      ripple={false}
                      size={isMobile ? 'sm' : 'md'}
                      icon={
                        !isMobile && chain.iconUrl ? (
                          <NextImage alt={chain.name} src={chain.iconUrl} width={24} height={24} />
                        ) : undefined
                      }
                      onClick={() => openChainModal()}
                    >
                      {chain.name}
                    </Button>
                    <Spacer x={1} />
                    <Button
                      type="button"
                      color="gradient"
                      auto
                      ripple={false}
                      size={isMobile ? 'sm' : 'md'}
                      icon={
                        !isMobile ? (
                          account.ensAvatar ? (
                            <NextImage alt={account.ensName} src={account.ensAvatar} width={24} height={24} />
                          ) : (
                            <Wallet primaryColor="currentColor" set="curved" />
                          )
                        ) : undefined
                      }
                      onClick={() => openAccountModal()}
                    >
                      {account.displayName}
                    </Button>
                  </StyledConnectedContainer>
                );
              })()}
            </StyledContainer>
          );
        }}
      </RainbowButton.Custom>
    </Fragment>
  );
};

interface ConnectButtonProps {}
