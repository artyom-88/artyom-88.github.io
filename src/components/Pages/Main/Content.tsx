import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { FunctionComponent } from 'react';
import { artyom } from 'src/assets';
import { BLANK, REL } from 'src/const';
import useStyles from './styles';

const LINKS = {
  Back: 'https://github.com/Artyom-Ganev/artyom-ganev-node',
  Front: 'https://github.com/Artyom-Ganev/artyom-ganev-site',
  Rybinsk: 'https://en.wikipedia.org/wiki/Rybinsk',
};

const Content: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Card className={classes.mainPage} raised>
      <CardContent className={classes.mainPageContent}>
        <Typography variant='h4' paragraph>
          Hi! My name is Artyom.
        </Typography>
        <Typography className={classes.mainPageBlock} paragraph variant='h6'>
          I&apos;m a programmer, based in&nbsp;
          <a href={LINKS.Rybinsk} target={BLANK} rel={REL}>
            Rybinsk
          </a>
          ,&nbsp;Russia. There are some facts about me on this site. Use &quot;MENU&quot; button to navigate.
        </Typography>
        <Typography className={classes.mainPageBlock} paragraph variant='h6'>
          Front-End of this site is based on React, Redux, TypeScript and Material UI, the sources of this part are
          located on GitHub&nbsp;
          <a href={LINKS.Front} target={BLANK} rel={REL}>
            here
          </a>
          .
        </Typography>
        <Typography className={classes.mainPageBlock} paragraph variant='h6'>
          Back-End uses Nest.js, Mongo DB, Heroku and is located&nbsp;
          <a href={LINKS.Back} target={BLANK} rel={REL}>
            here
          </a>
          .
        </Typography>
        <Typography className={classes.mainPageBlock} paragraph variant='h6'>
          You can contact me if you have some ideas for it&apos;s improvement or if you find some bugs, typos etc.
          I&apos;m still working on it.
        </Typography>
      </CardContent>
      <CardMedia className={classes.mainPageImage} image={artyom} title='Artyom' />
    </Card>
  );
};

export default Content;
