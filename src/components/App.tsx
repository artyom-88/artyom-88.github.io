import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.scss';
import Menu from './Navigation/Menu';
import About from './Page/About';
import Blog from './Page/Blog';
import Career from './Page/Career';
import Contacts from './Page/Contacts';
import Main from './Page/Main';
import NotFound from './Page/NotFound';

/**
 * Main application
 */
export default () => (
    <HashRouter>
        <Menu/>
        <div className='components-app__background'/>
        <div className='flexBox flexColumn components-app__content'>
            <Switch>
                <Route exact={true} path='/'>{Main}</Route>
                <Route path='/about'>{About}</Route>
                <Route path='/blog'>{Blog}</Route>
                <Route path='/career'>{Career}</Route>
                <Route path='/contacts'>{Contacts}</Route>
                <Route>{NotFound}</Route>
            </Switch>
        </div>
        <div className='components-app__rights'>© 2019 All rights reserved</div>
    </HashRouter>
);
