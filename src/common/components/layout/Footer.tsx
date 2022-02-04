import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { BLANK, REL } from 'common/const/html.const';
import { ComponentWithClassName } from 'common/types/common.types';
import { ReactElement } from 'react';
import useStyles from './Footer.styles';

export const RIGHTS_TEXT = '© 2020 All rights reserved';

const GITHUB = 'https://github.com/Artyom-Ganev';
const LINKEDIN = 'https://www.linkedin.com/in/artem-ganev-185b38192';
const FACEBOOK = 'https://www.facebook.com/artyom.ganev';

/**
 * Footer component
 */
const Footer = ({ className }: ComponentWithClassName): ReactElement => {
  const classes = useStyles();
  return (
    <Container className={className} disableGutters fixed component='footer'>
      <div className='ag-flexbox ag-alignItems_center'>
        <Typography color='textSecondary' className={classes.footerText}>
          {RIGHTS_TEXT}
        </Typography>
        <a href={GITHUB} target={BLANK} rel={REL}>
          <GitHubIcon color='action' fontSize='small' className={classes.footerIcon} />
        </a>
        <a href={LINKEDIN} target={BLANK} rel={REL}>
          <LinkedInIcon color='action' className={classes.footerIcon} />
        </a>
        <a href={FACEBOOK} target={BLANK} rel={REL}>
          <FacebookIcon color='action' className={classes.footerIcon} />
        </a>
      </div>
    </Container>
  );
};

export default Footer;
