import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Menu from './Navigation/Menu';
import Main from './Page/Main';
import About from './Page/About';
import Blog from './Page/Blog';
import Career from './Page/Career';
import Contacts from './Page/Contacts';
import NotFound from './Page/NotFound';
import './App.scss';

/**
 * Main application component
 */
export default () => (
  <HashRouter>
    <div className='flexBox flexColumn'>
      <Menu />
      <div className='components-app__background' />
      <div className='flexBox flexColumn components-app__content'>
        <Switch>
          <Redirect from='/main' to='/' />
          <Route exact={true} path='/' component={Main} />
          <Route path='/about' component={About} />
          <Route path='/blog' component={Blog} />
          <Route path='/career' component={Career} />
          <Route path='/contacts' component={Contacts} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <div className='components-app__rights'>© 2019 All rights reserved</div>
    </div>
  </HashRouter>
);
