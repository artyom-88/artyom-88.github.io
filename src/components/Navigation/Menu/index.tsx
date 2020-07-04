import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { PopoverOrigin } from '@material-ui/core/Popover/Popover';
import AppsTwoToneIcon from '@material-ui/icons/AppsTwoTone';
import NavigationMenuItem from 'components/Navigation/Menu/Item';
import { PAGES } from 'const';
import React, { FC, MouseEvent, ReactNode, useCallback, useState } from 'react';
import { IPageProps } from '../../Pages';
import useStyles from './styles';

export const ANCHOR_ORIGIN: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
} as const;

export const TRANSFORM_ORIGIN: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left',
} as const;

export const MENU_TITLE = 'Menu';

/**
 * Navigation menu component
 */
const NavigationMenu: FC = () => {
  const classes = useStyles();
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
    <Container disableGutters fixed className={classes.navigationMenu} component='nav'>
      <Button
        variant='contained'
        color='primary'
        className={classes.navigationMenuButton}
        onClick={open}
        size='large'
        startIcon={<AppsTwoToneIcon />}
      >
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
          (props: IPageProps): ReactNode => {
            const { id } = props;
            return (
              <MenuItem disableGutters key={id}>
                <NavigationMenuItem {...props} onClick={close} />
              </MenuItem>
            );
          }
        )}
      </Menu>
    </Container>
  );
};

export default NavigationMenu;
