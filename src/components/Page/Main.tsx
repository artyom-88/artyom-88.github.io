import React from 'react';
import img from '../../resources/artyom.jpg';
import {BLANK, REL} from "../Utils/Const";
import Container from "./Container";
import './Main.scss';

const LINKS = {
    Back: 'https://github.com/Artyom-Ganev/artyom-ganev-server',
    Front: 'https://github.com/Artyom-Ganev/artyom-ganev-src',
    Rybinsk: 'https://en.wikipedia.org/wiki/Rybinsk'
};

const CONTENT_BLOCK = 'page-main__contentBlock';

/**
 * Main page
 */
const PAGE_CONTENT = (
    <div className='page-main__root'>
        <img className='page-main__image' src={img} alt='Artyom' title='artyom.jpg'/>
        <h2 className={CONTENT_BLOCK}>Hi! My name is Artyom.</h2>
        <div className={CONTENT_BLOCK}>
            I'm a programmer, based in&nbsp;
            <a href={LINKS.Rybinsk} target={BLANK} rel={REL}>Rybinsk</a>,&nbsp;Russia. There are some facts
            about me on this site.
        </div>
        <div className={CONTENT_BLOCK}>
            You can contact me if you have some ideas for it's improvement or have found bugs, typos etc. I'm
            still working on it.
        </div>
        <div className={CONTENT_BLOCK}>
            Frontend of this site is based on React, TypeScript and Sass, the sources of this part are
            located on GitHub&nbsp;
            <a href={LINKS.Front} target={BLANK} rel={REL}>here</a>.
        </div>
        <div className={CONTENT_BLOCK}>
            Backend uses Spring Boot, Maven, Heroku and PostgreSQL and is located&nbsp;
            <a href={LINKS.Back} target={BLANK} rel={REL}>here</a>.
        </div>
    </div>
);

export default () => <Container content={PAGE_CONTENT}/>;
