import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import './NotFound.scss';

const TITLE = 'Page Not Found';

/**
 * 404 page not component
 */
const NotFound = () => (
  <Container title={TITLE}>
    <div className='page-notFound__item'>
      <Link to='/'>Go to main page</Link>
    </div>
  </Container>
);

export default NotFound;
