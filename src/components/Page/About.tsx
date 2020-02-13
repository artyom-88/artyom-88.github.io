import React from 'react';
import bio from '../../resources/bio.json';
import './About.scss';
import Container from './Container';

/**
 * About page component
 */
const About = () => (
  <Container title='Artyom Ganev'>
    {bio.data.map((value: string, key: number) => (
      <div key={key} className='page-bio__item'>
        {value}
      </div>
    ))}
  </Container>
);

export default About;
