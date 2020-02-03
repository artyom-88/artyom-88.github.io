import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as actions from '../../actions';
import { BLANK, REL } from '../../constants/Html';
import { IBlog, IBlogItems } from '../../interface/IBlog';
import IState from '../../interface/IState';
import Source from '../../model/Source';
import DateUtil from '../../utils/Date';
import './Blog.scss';
import Abstract, { IProps as IAbstractProps } from './Data/Abstract';

const DATE_COMPARATOR = (item1: IBlog, item2: IBlog): number => {
  // TODO: Migrate to normal Date format https://github.com/Artyom-Ganev/artyom-ganev-src/issues/83
  const date1 = DateUtil.parseDateFromString(`${item1.year}-${item1.month}-${item1.day}`) || new Date();
  const date2 = DateUtil.parseDateFromString(`${item2.year}-${item2.month}-${item2.day}`) || new Date();
  return date1 < date2 ? 1 : -1;
};

const itemsSelector = createSelector(
  ({ blog }: IState) => blog,
  (blog: { items: IBlogItems }) => Object.values(blog.items)
);

const mapStateToProps = (state: IState) => ({ items: itemsSelector(state) });

const actionCreators = {
  appLoading: actions.appLoading,
  blogLoadList: actions.blogLoadList,
};

interface IProps<TData> extends IAbstractProps<TData> {
  appLoading: (payload: { loading: boolean }) => void;
  blogLoadList: (payload: { items: TData[] }) => void;
}

/**
 * Blog page
 */
class Blog extends Abstract<IBlog, IProps<IBlog>> {
  private readonly source: Source<IBlog>;

  constructor(props: IProps<IBlog>) {
    super(props);
    const { appLoading, blogLoadList } = props;
    this.source = new Source<IBlog>(
      'blog',
      () => {
        appLoading({ loading: true });
      },
      (data: IBlog[]) => {
        blogLoadList({ items: data });
      }
    );
  }

  protected getSource = (): Source<IBlog> => this.source;

  protected getContent = (blogList: IBlog[]): ReactNode[] =>
    blogList.sort(DATE_COMPARATOR).map(({ id, year, month, day, title, link, linkCaption }: IBlog) => (
      <div key={id} className='page-blog__itemContainer'>
        <div className='page-blog__title'>{DateUtil.format(`${year}-${month}-${day}`)}</div>
        <div className='page-blog__item'>{title}</div>
        {link && (
          <a href={link} target={BLANK} rel={REL} title='Click for details'>
            {linkCaption}
          </a>
        )}
      </div>
    ));
}

export default connect(mapStateToProps, actionCreators)(Blog);
