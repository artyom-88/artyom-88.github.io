import React from 'react';
import bio from '../../resources/bio.json';
import styles from './About.module.scss';
import Container from './Container';

/**
 * About page component
 */
const About = () => (
  <Container title='Artyom Ganev'>
    {bio.data.map((value: string, key: number) => (
      <div key={key} className={styles.item}>
        {value}
      </div>
    ))}
  </Container>
);

export default About;
