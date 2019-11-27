import React from 'react';
import careers from '../../resources/careers.json';
import {BLANK, REL} from '../Utils/Const';
import DateUtil from '../Utils/Date';
import './Careers.scss';
import Container from './Container';

const DATE_FORMAT = {
    month: 'long',
    year: 'numeric'
};

/**
 * Career dates formatting
 * @param dates - Starting and Ending of Career item
 */
const prepareDates = (dates: string[]): string => {
    const date1 = DateUtil.parseDateFromString(dates[0]);
    const date2 = DateUtil.parseDateFromString(dates[1]);
    if (date1) {
        const string1 = date1.toLocaleDateString('en-US', DATE_FORMAT);
        if (date2) {
            return `${string1} - ${date2.toLocaleDateString('en-US', DATE_FORMAT)}`;
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
                <h3 className='page-careers__title'>{title}</h3>
            </a>
        );
    }
    return <h3 className='page-careers__title'>{title}</h3>;
};

/**
 * Careers items markup
 */
const items = careers.data.map((item) => {
    return (
        <div key={item.key} className='page-careers__item'>
            {prepareTitle(item.site, item.title)}
            <div className='page-careers__dates'>{prepareDates(item.dates)}</div>
            <div className=''>{item.post}</div>
            <div className=''>{item.description}</div>
            <div className='flexBox flexColumn'>
                <div className=''>{item.tools}</div>
            </div>
        </div>
    );
});

/**
 * Page content
 */
const content = <div className='flexBox flexColumn'>{items}</div>;

/**
 * Careers page
 */
export default () => {
    return <Container title='Careers' content={content}/>;

}
