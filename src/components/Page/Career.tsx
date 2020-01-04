import React, { ReactNode } from 'react';
import ICareer from '../Interface/ICareer';
import ISource from '../Interface/ISource';
import BackendSource from '../Model/BackendSource';
import { BLANK, REL } from '../Utils/Const';
import AbstractPage from './AbstractPage';
import './Career.scss';

const DATE_FORMAT = {
    month: 'long',
    year: 'numeric'
};

const PAGE_NAME = 'career';
const BASE_URL = `https://shielded-brushlands-46595.herokuapp.com/career/`;

/**
 * Career dates formatting
 * @param {Date} start - Star date
 * @param {Date} end - End date
 */
const prepareDates = (start: Date, end: Date): string => {
    if (start) {
        const startDate = new Date(start);
        const string1 = startDate.toLocaleDateString('en-US', DATE_FORMAT);
        if (end) {
            const endDate = new Date(end);
            return `${ string1 } - ${ endDate.toLocaleDateString('en-US', DATE_FORMAT) }`;
        }
        return `Since ${ string1 }`;
    }
    return '';
};

/**
 * Prepare Career item title. Wraps company name with link if site exists.
 * @param site - company site
 * @param title - company name
 */
const prepareTitle = (site: string | undefined, title: string | undefined) => {
    const header = <h3 className='page-career__title'>{ title }</h3>;
    return site ? <a href={ site } target={ BLANK } rel={ REL }>{ header }</a> : title;
};

/**
 * Career page
 */
export default class Career extends AbstractPage<ICareer> {
    protected pageName: string = PAGE_NAME;
    protected source: ISource<ICareer> = new BackendSource<ICareer>(PAGE_NAME, BASE_URL);

    protected getContent(): ReactNode {
        /**
         * Career items markup
         */
        const items = this.getItems().map(({ id, site, title, startDate, endDate, post, description, tools }: ICareer) => (
            <div key={ id } className='page-career__item'>
                { prepareTitle(site, title) }
                <div className='page-career__dates'>{ prepareDates(startDate, endDate) }</div>
                <div className=''>Post:&nbsp;{ post }</div>
                <div className=''>{ description }</div>
                <div className='flexBox flexColumn'>
                    <div className=''>Tools:&nbsp;{ tools }</div>
                </div>
            </div>
        ));
        return <div className='flexBox flexColumn'>{ items }</div>;
    }
}
