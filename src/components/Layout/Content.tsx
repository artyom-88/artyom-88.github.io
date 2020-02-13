import React from 'react';
import Routes from '../Navigation/Routes';
import './Content.scss';

/**
 * App Content component
 */
const Content = () => (
  <>
    <div className='components-content__background' />
    <div className='flexBox flexColumn components-content__wrapper'>
      <Routes />
    </div>
  </>
);

export default Content;
