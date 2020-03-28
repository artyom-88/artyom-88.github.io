import React, { FunctionComponent, useContext } from 'react';
import { artyom } from 'src/assets';
import { NarrowContext } from 'src/components';
import { BLANK, REL } from 'src/const';
import { PageContainer } from 'src/container';
import GitHub from './GitHub';
import styles from './Main.module.scss';

const LINKS = {
  Back: 'https://github.com/Artyom-Ganev/artyom-ganev-server',
  Front: 'https://github.com/Artyom-Ganev/artyom-ganev-site',
  Rybinsk: 'https://en.wikipedia.org/wiki/Rybinsk',
};

const CONTENT = (
  <div>
    <img className={styles.image} src={artyom} alt='Artyom' title='artyom.jpg' />
    <h2 className={styles.contentBlock}>Hi! My name is Artyom.</h2>
    <div className={styles.contentBlock}>
      I&apos;m a programmer, based in&nbsp;
      <a href={LINKS.Rybinsk} target={BLANK} rel={REL}>
        Rybinsk
      </a>
      ,&nbsp;Russia. There are some facts about me on this site.
    </div>
    <div className={styles.contentBlock}>
      You can contact me if you have some ideas for it&apos;s improvement or if you find some bugs, typos etc. I&apos;m
      still working on it.
    </div>
    <div className={styles.contentBlock}>
      Frontend of this site is based on React, Redux, TypeScript and Sass, the sources of this part are located on
      GitHub&nbsp;
      <a href={LINKS.Front} target={BLANK} rel={REL}>
        here
      </a>
      .
    </div>
    <div className={styles.contentBlock}>
      Backend uses Spring Boot, Maven, Heroku and PostgreSQL and is located&nbsp;
      <a href={LINKS.Back} target={BLANK} rel={REL}>
        here
      </a>
      .
    </div>
  </div>
);

/**
 * Main page component
 */
const Main: FunctionComponent = () => {
  const narrow = useContext(NarrowContext);
  return (
    <PageContainer>
      {CONTENT}
      {!narrow && <GitHub />}
    </PageContainer>
  );
};

export default Main;
