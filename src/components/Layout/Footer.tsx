import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { IClassName } from 'components/Components.types';
import { BLANK, REL } from 'const';
import { ReactElement } from 'react';
import useStyles from './Footer.styles';

export const RIGHTS_TEXT = '© 2020 All rights reserved';

const GITHUB = 'https://github.com/Artyom-Ganev';
const LINKEDIN = 'https://www.linkedin.com/in/artem-ganev-185b38192';
const FACEBOOK = 'https://www.facebook.com/artyom.ganev';

/**
 * Footer component
 */
const Footer = ({ className }: IClassName): ReactElement => {
  const classes = useStyles();
  return (
    <Container className={className} disableGutters fixed component='footer'>
      <Box display='flex' alignItems='center'>
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
      </Box>
    </Container>
  );
};

export default Footer;
