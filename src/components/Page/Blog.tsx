import React from 'react';
import BlogSource from '../Source/Blog';
import IBlog from '../Source/IBlog';
import {BLANK, REL} from "../Utils/Const";
import DateUtil from '../Utils/Date';
import './Blog.scss';
import Container from './Container';

const DATE_COMPARATOR = (item1: IBlog, item2: IBlog): number => {
    // TODO: Migrate to normal Date format https://github.com/Artyom-Ganev/artyom-ganev-src/issues/83
    const date1 = DateUtil.parseDateFromString(`${item1.year}-${item1.month}-${item1.day}`) || new Date();
    const date2 = DateUtil.parseDateFromString(`${item2.year}-${item2.month}-${item2.day}`) || new Date();
    return date1 < date2 ? 1 : -1;
};

/**
 * Blog page
 */
export default class Blog extends React.Component {
    public state: { items: IBlog[] } = {items: []};

    public componentDidMount() {
        BlogSource.getList().then((items: IBlog[]) => {
            this.setState({items});
        });
    }

    public render() {
        const content = <div className='flexBox flexColumn'>{this.getItems()}</div>;
        return <Container title='Blog' content={content}/>;
    }

    /**
     * Blog items markup
     */
    private getItems() {
        return this.state.items.sort(DATE_COMPARATOR).map((item: IBlog) => {
            return (
                <div key={item.id} className='page-blog__itemContainer'>
                    <div
                        className='page-blog__title'>{DateUtil.format(`${item.year}-${item.month}-${item.day}`)}</div>
                    <div className='page-blog__item'>{item.title}</div>
                    <a href={item.link} target={BLANK} rel={REL}>{item.linkCaption}</a>
                </div>
            );
        });
    }
}