import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import About from '../Page/About';
import Blog from '../Page/Blog';
import Career from '../Page/Career';
import Contacts from '../Page/Contacts';
import Main from '../Page/Main';
import NotFound from '../Page/NotFound';

/**
 * Application routes component
 */
export default () => (
  <Switch>
    <Redirect from='/main' to='/' />
    <Route exact={true} path='/' component={Main} />
    <Route exact={true} path='/about' component={About} />
    <Route exact={true} path='/blog' component={Blog} />
    <Route exact={true} path='/career' component={Career} />
    <Route exact={true} path='/contacts' component={Contacts} />
    <Route component={NotFound} />
  </Switch>
);
