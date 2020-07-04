import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { artyom } from 'assets';
import useStyles from 'components/Pages/Main.styles';
import { BLANK, REL } from 'const';
import React, { FC } from 'react';

const LINKS = {
  Back: 'https://github.com/Artyom-Ganev/artyom-ganev-node',
  Front: 'https://github.com/Artyom-Ganev/artyom-ganev-site',
  Rybinsk: 'https://en.wikipedia.org/wiki/Rybinsk',
};

const MainPageContent: FC = () => {
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
    </Card>
  );
};

export default MainPageContent;
