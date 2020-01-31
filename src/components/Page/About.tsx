import React from 'react';
import bio from '../../resources/bio.json';
import Container from './Container';
import './About.scss';

/**
 * About page component
 */
export default () => (
  <Container title='Artyom Ganev'>
    {bio.data.map((value: string, key: number) => (
      <div key={key} className='page-bio__item'>
        {value}
      </div>
    ))}
  </Container>
);
