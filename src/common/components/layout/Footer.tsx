import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ComponentWithClassName } from 'common/types/common.types';
import { ReactElement } from 'react';

export const RIGHTS_TEXT = `© ${new Date().getFullYear()} All rights reserved`;

const Footer = ({ className }: ComponentWithClassName): ReactElement => (
  <Container className={className} component='footer' disableGutters fixed>
    <Paper square>
      <div className='ag-flexbox ag-justifyContent_center ag-alignItems_center'>
        <Typography color='textSecondary' fontWeight='bold'>
          {RIGHTS_TEXT}
        </Typography>
      </div>
    </Paper>
  </Container>
);

export default Footer;
