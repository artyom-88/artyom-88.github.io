import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { About, Blog, Career, Contacts, Main, NotFound } from 'components/Pages';

/**
 * Application routes component
 */
const Routes: FunctionComponent = () => (
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

export default Routes;
