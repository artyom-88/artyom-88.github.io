import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { PopoverOrigin } from '@material-ui/core/Popover/Popover';
import React, { FunctionComponent, MouseEvent, ReactNode, useCallback, useState } from 'react';
import NavigationMenuItem from 'src/components/Navigation/Menu/Item';
import { PAGES } from 'src/const';

export const ANCHOR_ORIGIN: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
} as const;

export const TRANSFORM_ORIGIN: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left',
} as const;

export const MENU_TITLE = 'Open Menu';

/**
 * /**
 * Navigation menu component
 */
const NavigationMenu: FunctionComponent = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const open = useCallback(
    ({ currentTarget }: MouseEvent<HTMLElement>) => {
      setAnchor(currentTarget);
    },
    [setAnchor]
  );

  const close = useCallback(() => {
    setAnchor(null);
  }, [setAnchor]);

  return (
    <nav>
      <Button variant='contained' color='primary' onClick={open}>
        {MENU_TITLE}
      </Button>
      <Menu
        anchorEl={anchor}
        anchorOrigin={ANCHOR_ORIGIN}
        elevation={0}
        getContentAnchorEl={null}
        id='menu'
        keepMounted
        onClose={close}
        open={Boolean(anchor)}
        transformOrigin={TRANSFORM_ORIGIN}
      >
        {PAGES.map(
          ({ id, name, url }): ReactNode => (
            <MenuItem disableGutters key={id}>
              <NavigationMenuItem name={name} onClick={close} url={url} />
            </MenuItem>
          )
        )}
      </Menu>
    </nav>
  );
};

export default NavigationMenu;
