import React, { FunctionComponent } from 'react';

import bio from '../../assets/bio.json';
import Container from '../../container/Page/Container';

import styles from './About.module.scss';

/**
 * About page component
 */
const About: FunctionComponent = () => (
  <Container title='Artyom Ganev'>
    {bio.data.map((value: string, key: number) => (
      <div key={key} className={styles.item}>
        {value}
      </div>
    ))}
  </Container>
);

export default About;
