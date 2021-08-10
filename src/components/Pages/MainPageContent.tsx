import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { artyom } from 'assets';
import { BLANK, REL } from 'const';
import { ReactElement } from 'react';
import useStyles from './Main.styles';

const LINKS = {
  Back: 'https://github.com/Artyom-Ganev/artyom-ganev-node',
  Front: 'https://github.com/Artyom-Ganev/artyom-ganev-site',
  Rybinsk: 'https://en.wikipedia.org/wiki/Rybinsk',
};

const TOOLTIP = 'Click to see sources';

const MainPageContent = (): ReactElement => {
  const classes = useStyles();
  return (
    <Card raised>
      <CardContent className={classes.mainPageContent}>
        <CardMedia className={classes.mainPageImage} image={artyom} title='Artyom' />
        <Typography variant='h4' paragraph>
          Hi! My name is Artyom.
        </Typography>
        <Typography className={classes.mainPageBlock} paragraph variant='h6'>
          I&apos;m a programmer, based in&nbsp;
          <a href={LINKS.Rybinsk} target={BLANK} rel={REL} title='Click to read about Rybinsk on Wikipedia'>
            Rybinsk
          </a>
          ,&nbsp;Russia. There are some facts about me on this site. Use &quot;MENU&quot; button to navigate.
        </Typography>
        <Typography className={classes.mainPageBlock} paragraph variant='h6'>
          <a href={LINKS.Front} target={BLANK} rel={REL} title={TOOLTIP}>
            Front-End
          </a>
          &nbsp;of the site is based on React, Redux, TypeScript and Material UI.
        </Typography>
        <Typography className={classes.mainPageBlock} paragraph variant='h6'>
          <a href={LINKS.Back} target={BLANK} rel={REL} title={TOOLTIP}>
            Back-End
          </a>
          &nbsp;application is developed using Nest.js, Heroku and Mongo DB Atlas.
        </Typography>
        <Typography className={classes.mainPageBlock} paragraph variant='h6'>
          You can contact me if you have some ideas for it&apos;s improvement or if you find some bugs, typos, etc.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MainPageContent;
