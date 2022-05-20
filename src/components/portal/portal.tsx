import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { FC, PropsWithChildren, ReactPortal } from 'react';

export const Portal: FC<PortalProps> = (props: PortalProps): ReactPortal => {
  const { className, overflowHidden, children } = props;

  const [container] = useState(() => {
    const portal = document.createElement('portal');
    portal.classList.add(className);
    return portal;
  });

  useEffect(() => {
    document.body.appendChild(container);
    const next = document.querySelector<HTMLDivElement>('#__next');
    overflowHidden && document.body.style.setProperty('overflow', 'hidden');
    next && next.style.setProperty('user-select', 'none');

    return () => {
      document.body.removeChild(container);
      next && next.removeAttribute('style');
      document.body.removeAttribute('style');
    };
  }, [container, overflowHidden]);

  return createPortal(children, container);
};

type PortalProps = PropsWithChildren<{
  className: string;
  overflowHidden: boolean;
}>;
