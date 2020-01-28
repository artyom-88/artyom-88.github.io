import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import './NotFound.scss';

const TEXT = 'Page Not Found';

const content = (
  <div className='page-notFound__item'>
    <Link to='/'>Go to main page</Link>
  </div>
);

/**
 * 404 page not component
 */
export default () => <Container title={TEXT} content={content} />;
