import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import useStyles from './NavigationMenu.styles';
import { INavigationMenuItem } from './NavigationMenu.types';

const NavigationMenuItem = ({ Icon, name, onClick, url }: INavigationMenuItem): ReactElement => {
  const classes = useStyles();
  return (
    <NavLink className={classes.navigationMenuLink} to={`/${url}`} onClick={onClick}>
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
