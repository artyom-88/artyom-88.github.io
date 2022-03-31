import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useTheme from '@mui/material/styles/useTheme';
import Toolbar from '@mui/material/Toolbar';
import GitHubIcon from 'common/components/icons/GitHubIcon';
import StackOverflowIcon from 'common/components/icons/StackOverflowIcon';
import { PAGES_LIST_META } from 'common/const/pages.const';
import { ComponentWithClassName, PageProps } from 'common/types/common.types';
import { openWindow } from 'common/utils/navigate.utils';
import { ReactElement, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const openGithub = () => openWindow('https://github.com/artyom-88');

const openStackOverflow = () => openWindow('https://stackoverflow.com/users/6880595/artyom-ganev');

const Header = ({ className }: ComponentWithClassName): ReactElement => {
  const theme = useTheme();
  return (
    <AppBar component='header' position='static' className={className}>
      <Toolbar component='nav' className='ag-flexbox ag-alignItems_center ag-justifyContent_between'>
        <List className='ag-flexbox'>
          {PAGES_LIST_META.map(
            ({ id, name, url }: PageProps): ReactNode => (
              <ListItem key={id} color={theme.palette.common.white}>
                <NavLink className='ag-flexbox ag-justifyContent_center ag-alignItems_center' to={`/${url}`}>
                  <ListItemText
                    color='inherit'
                    primary={name}
                    primaryTypographyProps={{ fontSize: theme.spacing(3) }}
                  />
                </NavLink>
              </ListItem>
            )
          )}
        </List>
        <div>
          <IconButton onClick={openGithub}>
            <GitHubIcon />
          </IconButton>
          <IconButton onClick={openStackOverflow}>
            <StackOverflowIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
