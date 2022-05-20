import { Fragment, useState } from 'react';
import { Button, Container, Grid, Input, Row, Spacer, Text } from '@nextui-org/react';
import { DiscordIcon, FacebookIcon, InstagramIcon, TwitterIcon } from '@components/icons';
import { Logo } from '@components/logos';
import { NavItem } from '@components/nav-item';
import { StyledFooter, StyledFooterContainer } from './footer.styles';
import type { FormElement } from '@nextui-org/react';
import type { ChangeEvent, FC } from 'react';

export const Footer: FC<FooterProps> = (props: FooterProps) => {
  const {} = props;

  const [email, setEmail] = useState<string>();

  const emailChangeHandler = (event: ChangeEvent<FormElement>) => {
    setEmail(event.target.value);
  };

  const subscribeHandler = () => {};

  return (
    <Fragment>
      <StyledFooter as="footer">
        <StyledFooterContainer>
          <Container
            as="nav"
            css={{ py: '$lg', gap: '$xl' }}
            display="flex"
            wrap="nowrap"
            justify="space-between"
            alignItems="flex-start"
            md
          >
            <Grid.Container css={{ p: '0px' }} gap={4} justify="space-between">
              <Grid xs={12} sm={6} md={3} direction="column" justify="flex-start" alignItems="flex-start">
                <NavItem href="/" css={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                  <Logo css={{ size: '$14' }} />
                  <Spacer x={0.5} />
                  <Text b size="1.25rem">
                    InsureFi
                  </Text>
                </NavItem>
                <Spacer y={1} />
                <Text>A decentralized car insurance company that aims at making car insurance coverage hassle free and smooth.</Text>
                <Spacer y={1} />
                <Row justify="flex-start" align="center" css={{ gap: '$lg' }}>
                  <NavItem href="/">
                    <TwitterIcon css={{ size: '$9' }} />
                  </NavItem>
                  <NavItem href="/">
                    <DiscordIcon css={{ size: '$9' }} />
                  </NavItem>
                  <NavItem href="/">
                    <FacebookIcon css={{ size: '$9' }} />
                  </NavItem>
                  <NavItem href="/">
                    <InstagramIcon css={{ size: '$9' }} />
                  </NavItem>
                </Row>
              </Grid>
              <Grid xs={12} sm={6} md={2} direction="column" justify="flex-start" alignItems="flex-start">
                <Text b>Services</Text>
                <Spacer y={1.5} />
                <Row justify="flex-start" align="center">
                  <NavItem href="/register" css={{ dflex: 'center', gap: '$sm' }}>
                    {/* <ShieldDone primaryColor="currentColor" set="curved" /> */}
                    <Text span>Car Insurance</Text>
                  </NavItem>
                </Row>
                <Spacer y={1} />
                <Row justify="flex-start" align="center">
                  <NavItem href="/claim" css={{ dflex: 'center', gap: '$sm' }}>
                    {/* <EditSquare primaryColor="currentColor" set="curved" /> */}
                    <Text span>Claims</Text>
                  </NavItem>
                </Row>
              </Grid>
              <Grid xs={12} sm={6} md={2} direction="column" justify="flex-start" alignItems="flex-start">
                <Text b>Stay In Touch</Text>
                <Spacer y={1.5} />
                <Row justify="flex-start" align="center">
                  <NavItem href="mailto: Support@insurefi.com" css={{ dflex: 'center', gap: '$sm' }}>
                    {/* <Message primaryColor="currentColor" set="curved" /> */}
                    <Text span>support@insurefi.com</Text>
                  </NavItem>
                </Row>
                <Spacer y={1} />
                <Row justify="flex-start" align="center">
                  <NavItem href="tel: +1 234 567 890" css={{ dflex: 'center', gap: '$sm' }}>
                    {/* <Call primaryColor="currentColor" set="curved" /> */}
                    <Text span>+1 234 567 890</Text>
                  </NavItem>
                </Row>
              </Grid>
              <Grid xs={12} sm={6} md={3} direction="column" justify="flex-start" alignItems="flex-start">
                <Text b>Newsletter</Text>
                <Spacer y={1.5} />
                <Row justify="flex-start" align="center">
                  <Input
                    css={{ width: '100%' }}
                    type="email"
                    color="default"
                    placeholder="Enter email"
                    aria-label="Subscribe email"
                    underlined
                    onChange={(event: ChangeEvent<FormElement>) => emailChangeHandler(event)}
                  />
                </Row>
                <Spacer y={1} />
                <Row justify="flex-start" align="center">
                  <Button type="button" color="gradient" auto ripple={false} disabled={!email} onClick={() => subscribeHandler()}>
                    Subscribe
                  </Button>
                </Row>
              </Grid>
            </Grid.Container>
          </Container>
        </StyledFooterContainer>
      </StyledFooter>
    </Fragment>
  );
};

interface FooterProps {}
