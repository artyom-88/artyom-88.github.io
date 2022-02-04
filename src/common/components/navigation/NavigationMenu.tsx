import Container from '@mui/material/Container';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { PAGES_LIST_META } from 'common/const/pages.const';
import { PageProps } from 'common/types/common.types';
import { ReactElement, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import useStyles from './NavigationMenu.styles';

const NavigationMenu = (): ReactElement => {
  const classes = useStyles();

  return (
    <Container disableGutters fixed className={classes.navigationMenu} component='nav'>
      <div className='ag-flexbox ag-justifyContent_center'>
        {PAGES_LIST_META.map(
          ({ id, Icon, name, url }: PageProps): ReactNode => (
            <NavLink key={id} className={classes.navigationMenuLink} to={`/${url}`}>
              {Icon && (
                <ListItemIcon>
                  <Icon fontSize='small' />
                </ListItemIcon>
              )}
              <ListItemText primary={name} />
            </NavLink>
          )
        )}
      </div>
    </Container>
  );
};

export default NavigationMenu;
