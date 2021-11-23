import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { PopoverOrigin } from '@material-ui/core/Popover/Popover';
import AppsTwoToneIcon from '@material-ui/icons/AppsTwoTone';
import NavigationMenuItem from 'common/components/navigation/NavigationMenuItem';
import { PAGES_LIST_META } from 'common/const/pages.const';
import { PageProps } from 'common/types/common.types';
import { MouseEvent, ReactElement, ReactNode, useCallback, useState } from 'react';
import useStyles from './NavigationMenu.styles';

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
 * navigation menu component
 */
const NavigationMenu = (): ReactElement => {
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
        {PAGES_LIST_META.map((props: PageProps): ReactNode => {
          const { id } = props;
          return (
            <MenuItem disableGutters key={id}>
              <NavigationMenuItem {...props} onClick={close} />
            </MenuItem>
          );
        })}
      </Menu>
    </Container>
  );
};

export default NavigationMenu;
