import React from 'react';
import json from '../../resources/bio.json';
import IPageData from '../Interface/IPageData';
import ISource from '../Interface/ISource';
import JsonSource from '../Model/JsonSource';
import './About.scss';
import AbstractPage from './AbstractPage';

/**
 * About page
 */
export default class About extends AbstractPage<IPageData> {
    protected readonly pageName: string = 'about';
    protected source: ISource<IPageData> = new JsonSource<IPageData>(json);

    protected getContent = () => this.getItems().map(({ id, title }) => (
        <div key={ id } className='page-bio__item'>{ title }</div>
    ));

    protected getTitle = () => 'Artyom Ganev';
}