import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import * as actions from 'src/actions';
import { APP_LOADING, BLOG_LOAD_LIST } from 'src/actions';
import { BLANK, REL } from 'src/const';
import { AbstractDataContainer } from 'src/container';
import { IAppLoading, IDataProps, ILoadBlogList, IRawBlogData, IState, Source } from 'src/interface';
import { BlogModel, createSource } from 'src/model';
import { blogItemsSelector } from 'src/selectors';
import styles from './Blog.module.scss';

interface IDispatchProps {
  appLoading: typeof actions.appLoading;
  blogLoadList: typeof actions.blogLoadList;
}

type Props = IDataProps<BlogModel> & IDispatchProps;

const DATE_COMPARATOR = (item1: BlogModel, item2: BlogModel): number => (item1.date.isBefore(item2.date) ? 1 : -1);

const mapStateToProps = (state: IState): IDataProps<BlogModel> => ({ items: blogItemsSelector(state) });

const mapDispatch: IDispatchProps = {
  appLoading: (loading: boolean): IAppLoading => ({
    type: APP_LOADING,
    payload: { loading },
  }),
  blogLoadList: (items: BlogModel[]): ILoadBlogList => ({
    type: BLOG_LOAD_LIST,
    payload: { items },
  }),
};

const createModel = ({ id, day, month, year, link, linkCaption, title }: IRawBlogData): BlogModel =>
  // prettier-ignore
  BlogModel.create()
    .year(year)
    .month(month)
    .day(day)
    .link(link)
    .linkCaption(linkCaption)
    .title(title)
    .id(id)
    .build();

/**
 * Blog page
 */
class Blog extends AbstractDataContainer<BlogModel, Props> {
  private readonly source: Source;

  constructor(props: Props) {
    super(props);
    const { appLoading, blogLoadList } = props;
    this.source = createSource<IRawBlogData>()
      .endpoint('blog')
      .beforeLoad(() => appLoading(true))
      .afterLoad((data: IRawBlogData[]) => blogLoadList(data.map(createModel)))
      .build();
  }

  protected getSource = (): Source => this.source;

  protected getContent = (blogList: BlogModel[]): ReactNode[] =>
    blogList.sort(DATE_COMPARATOR).map((item: BlogModel) => {
      const { id, title, link, linkCaption } = item;
      return (
        <div key={id} className={styles.itemContainer}>
          <div className={styles.title}>{item.formatDate()}</div>
          <div className={styles.item}>{title}</div>
          {link && (
            <a href={link} target={BLANK} rel={REL} title='Click for details'>
              {linkCaption}
            </a>
          )}
        </div>
      );
    });
}

export default connect<IDataProps<BlogModel>, IDispatchProps, {}, IState>(mapStateToProps, mapDispatch)(Blog);
