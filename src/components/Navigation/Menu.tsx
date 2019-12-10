import React from 'react';
import {Link} from 'react-router-dom';
import './Menu.scss';

/**
 * Navigation menu
 */
export default () => {
    return (
        <div className="flexBox nav-menu__root" id="menu">
            <Link className="nav-menu__item" to="/">Main</Link>
            <Link className="nav-menu__item" to="/about">About</Link>
            <Link className="nav-menu__item" to="/blog">Blog</Link>
            <Link className="nav-menu__item" to="/career">Career</Link>
            <Link className="nav-menu__item" to="/contacts">Contacts</Link>
            <Link className="nav-menu__item" to="/gallery">Gallery</Link>
        </div>
    );
}
