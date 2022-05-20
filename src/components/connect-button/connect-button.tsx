import { Fragment } from 'react';
import { Button, Spacer } from '@nextui-org/react';
import { ConnectButton as RainbowButton } from '@rainbow-me/rainbowkit';
import { default as NextImage } from 'next/image';
import { Wallet } from 'react-iconly';
import { StyledConnectedContainer, StyledContainer } from './connect-button.styles';
import type { FC } from 'react';

export const ConnectButton: FC<ConnectButtonProps> = (props: ConnectButtonProps) => {
  const {} = props;

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
                  <StyledConnectedContainer>
                    <Button
                      type="button"
                      color="gradient"
                      auto
                      bordered
                      ripple={false}
                      icon={chain.iconUrl && <NextImage alt={chain.name} src={chain.iconUrl} width={24} height={24} />}
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
                      icon={
                        account.ensAvatar ? (
                          <NextImage alt={account.ensName} src={account.ensAvatar} width={24} height={24} />
                        ) : (
                          <Wallet primaryColor="currentColor" set="curved" />
                        )
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
