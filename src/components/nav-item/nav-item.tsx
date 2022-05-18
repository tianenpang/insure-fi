import { Fragment } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { default as NextLink } from 'next/link';
import { StyledLink } from './nav-item.styles';
import type { CSS, LinkProps } from '@nextui-org/react';
import type { FocusRingAria } from '@react-aria/focus';
import type { FC, HTMLAttributeAnchorTarget, HTMLAttributes, ReactNode } from 'react';

export const NavItem: FC<NavItemProps> = (props: NavItemProps) => {
  const { href, target, children, css } = props;

  const { focusProps, isFocusVisible }: IFocusRingAria = useFocusRing();

  return (
    <Fragment>
      <NextLink href={href} target={target} passHref>
        <StyledLink css={{ color: '$text', transition: '$button', ...css }} isFocusVisible={isFocusVisible} {...focusProps}>
          {children}
        </StyledLink>
      </NextLink>
    </Fragment>
  );
};

interface NavItemProps {
  css?: CSS;
  href: string;
  children: ReactNode;
  target?: HTMLAttributeAnchorTarget;
}

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<HTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;
}
