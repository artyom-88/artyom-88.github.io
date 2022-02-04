import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ComponentWithClassName } from 'common/types/common.types';
import { openWindow } from 'common/utils/navigate.utils';
import { ReactElement, SyntheticEvent, useCallback } from 'react';
import { FOOTER_LINKS, RIGHTS_TEXT } from './Footer.constants';
import { FooterLinks } from './Footer.types';

const Footer = ({ className }: ComponentWithClassName): ReactElement => {
  const onLinkClick = useCallback((e: SyntheticEvent, value: FooterLinks) => {
    const url = FOOTER_LINKS[value].url;
    openWindow(url);
  }, []);

  return (
    <Container className={className} component='footer' disableGutters fixed>
      <Paper square>
        <BottomNavigation onChange={onLinkClick}>
          {Object.entries(FOOTER_LINKS).map(([k, { Icon }]) => (
            <BottomNavigationAction key={k} value={k} icon={<Icon />} />
          ))}
        </BottomNavigation>
        <div className='ag-flexbox ag-justifyContent_center ag-alignItems_center'>
          <Typography color='textSecondary' fontWeight='bold'>
            {RIGHTS_TEXT}
          </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default Footer;
