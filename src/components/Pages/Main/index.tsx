import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { FunctionComponent } from 'react';
import { artyom } from 'src/assets';
import { PageContainer } from 'src/components/Pages';
import { BLANK, REL } from 'src/const';
import useStyles from './styles';

const LINKS = {
  Back: 'https://github.com/Artyom-Ganev/artyom-ganev-node',
  Front: 'https://github.com/Artyom-Ganev/artyom-ganev-site',
  Rybinsk: 'https://en.wikipedia.org/wiki/Rybinsk',
};

const Content = () => {
  const classes = useStyles();
  return (
    <Card className={classes.mainPage} raised>
      <CardContent className={classes.mainPageContent}>
        <Typography variant='h4' paragraph>
          Hi! My name is Artyom.
        </Typography>
        <Typography className={classes.mainPageBlock} paragraph>
          I&apos;m a programmer, based in&nbsp;
          <a href={LINKS.Rybinsk} target={BLANK} rel={REL}>
            Rybinsk
          </a>
          ,&nbsp;Russia. There are some facts about me on this site.
        </Typography>
        <Typography className={classes.mainPageBlock} paragraph>
          You can contact me if you have some ideas for it&apos;s improvement or if you find some bugs, typos etc.
          I&apos; still working on it.
        </Typography>
        <Typography className={classes.mainPageBlock} paragraph>
          Front-end of this site is based on React, Redux, TypeScript and Sass, the sources of this part are located on
          GitHub&nbsp;
          <a href={LINKS.Front} target={BLANK} rel={REL}>
            here
          </a>
          .
        </Typography>
        <Typography className={classes.mainPageBlock} paragraph>
          Back-end uses Nest.js, Mongo DB, Heroku and is located&nbsp;
          <a href={LINKS.Back} target={BLANK} rel={REL}>
            here
          </a>
          .
        </Typography>
      </CardContent>
      <CardMedia className={classes.mainPageImage} image={artyom} title='Artyom' />
    </Card>
  );
};

/**
 * Main page component
 */
const Main: FunctionComponent = () => (
  <PageContainer>
    <Content />
  </PageContainer>
);

export default Main;
