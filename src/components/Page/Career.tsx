import React, {ReactNode} from 'react';
import ICareer from '../Model/ICareer';
import {BLANK, REL} from '../Utils/Const';
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
        const string1 = start.toLocaleDateString('en-US', DATE_FORMAT);
        if (end) {
            return `${string1} - ${end.toLocaleDateString('en-US', DATE_FORMAT)}`;
        }
        return `Since ${string1}`;
    }
    return '';
};

/**
 * Prepare Career item title. Wraps company name with link if site exists.
 * @param site - company site
 * @param title - company name
 */
const prepareTitle = (site: string | undefined, title: string | undefined) => {
    if (site) {
        return (
            <a href={site} target={BLANK} rel={REL}>
                <h3 className='page-career__title'>{title}</h3>
            </a>
        );
    }
    return <h3 className='page-career__title'>{title}</h3>;
};

/**
 * Career page
 */
export default class Career extends AbstractPage<ICareer> {
    public state: { items: ICareer[] } = {items: []};

    protected getBaseUrl(): string {
        return BASE_URL;
    }

    protected getPageName(): string {
        return PAGE_NAME;
    }

    protected getContent(): ReactNode {
        /**
         * Career items markup
         */
        const items = this.state.items.map((item: ICareer) => {
            return (
                <div key={item.id} className='page-career__item'>
                    {prepareTitle(item.site, item.title)}
                    <div className='page-career__dates'>{prepareDates(item.startDate, item.endDate)}</div>
                    <div className=''>Post:&nbsp;{item.post}</div>
                    <div className=''>{item.description}</div>
                    <div className='flexBox flexColumn'>
                        <div className=''>Tools:&nbsp;{item.tools}</div>
                    </div>
                </div>
            );
        });
        return <div className='flexBox flexColumn'>{items}</div>;
    }
}
