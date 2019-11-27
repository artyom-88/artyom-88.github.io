import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import './App.scss';
import Menu from './Navigation/Menu';
import Blog from './Page/Blog';
import Careers from './Page/Careers';
import Contacts from './Page/Contacts';
import Main from './Page/Main';

/**
 * Main application
 */
export default () => {
    return (
        <HashRouter>
            <Menu/>
            <div className='components-app__background'/>
            <div className='flexBox flexColumn components-app__content'>
                <Route exact={true} path='/' component={Main}/>
                <Route path='/blog' component={Blog}/>
                <Route path='/careers' component={Careers}/>
                <Route path='/contacts' component={Contacts}/>
            </div>
            <div className='components-app__rights'>© 2019 All rights reserved</div>
        </HashRouter>
    );
}
