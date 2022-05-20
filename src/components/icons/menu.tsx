import { Fragment } from 'react';
import { StyledSVG } from './icon.styles';
import type { StyledSVGProps } from './icon.styles';
import type { FC } from 'react';

export const MenuIcon: FC<StyledSVGProps> = (props: StyledSVGProps) => {
  const { css, ...rest } = props;

  return (
    <Fragment>
      <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" css={css} {...rest}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 15.576C4 17.172 4.777 18 6.274 18h7.452C15.223 18 16 17.172 16 15.576V4.424C16 2.835 15.223 2 13.726 2H6.274C4.777 2 4 2.835 4 4.424v11.152Zm5.996.976V3.448h3.611c.679 0 1.022.377 1.022 1.065v10.974c0 .688-.343 1.065-1.022 1.065h-3.61Z"
        />
      </StyledSVG>
    </Fragment>
  );
};
