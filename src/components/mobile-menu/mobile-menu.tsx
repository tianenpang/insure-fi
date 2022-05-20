import { Fragment, useCallback, useState } from 'react';
import { Button } from '@nextui-org/react';
import { AnimatePresence } from 'framer-motion';
import { MenuIcon } from '@components/icons';
import { SideNav } from './side-nav';
import type { FC } from 'react';

export const MobileMenu: FC<MobileMenuProps> = (props: MobileMenuProps) => {
  const {} = props;

  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = useCallback(() => {
    setVisible((prev: boolean) => !prev);
  }, []);

  const closeSideNav = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <Fragment>
      <Button
        css={{ '@xs': { display: 'none' } }}
        icon={<MenuIcon css={{ size: '$10' }} />}
        auto
        light
        onClick={() => toggleVisible()}
      />
      <AnimatePresence presenceAffectsLayout exitBeforeEnter>
        {visible && <SideNav onClose={() => closeSideNav()} />}
      </AnimatePresence>
    </Fragment>
  );
};

interface MobileMenuProps {}
