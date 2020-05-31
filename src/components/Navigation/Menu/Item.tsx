import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { INavigationMenuItem } from 'src/components/Navigation/Menu/types';
import useStyles from './styles';

const NavigationMenuItem: FunctionComponent<INavigationMenuItem> = ({
  Icon,
  name,
  onClick,
  url,
}: INavigationMenuItem) => {
  const classes = useStyles();
  return (
    <NavLink
      exact={!url}
      className={classes.navigationMenuLink}
      activeClassName='active'
      to={`/${url}`}
      onClick={onClick}
    >
      {Icon && (
        <ListItemIcon>
          <Icon fontSize='small' />
        </ListItemIcon>
      )}
      <ListItemText primary={name} />
    </NavLink>
  );
};

export default NavigationMenuItem;
