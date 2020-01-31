import React, { Component, ReactNode } from 'react';
import { BLANK, REL } from '../../constants/Html';
import { IBlog } from '../../interface/IBlog';
import DateUtil from '../../utils/Date';
import IState from '../../interface/IState';
import * as actions from '../../actions';
import Source from '../../model/Source';
import Container from './Container';
import { connect } from 'react-redux';
import './Blog.scss';

const DATE_COMPARATOR = (item1: IBlog, item2: IBlog): number => {
  // TODO: Migrate to normal Date format https://github.com/Artyom-Ganev/artyom-ganev-src/issues/83
  const date1 = DateUtil.parseDateFromString(`${item1.year}-${item1.month}-${item1.day}`) || new Date();
  const date2 = DateUtil.parseDateFromString(`${item2.year}-${item2.month}-${item2.day}`) || new Date();
  return date1 < date2 ? 1 : -1;
};

interface IProps {
  items: IBlog[];
  appLoading: (payload: { loading: boolean }) => void;
  blogLoadList: (payload: { items: IBlog[] }) => void;
}

const mapStateToProps = ({ blog: { items } }: IState) => ({
  items: Object.values(items),
});

const actionCreators = {
  appLoading: actions.appLoading,
  blogLoadList: actions.blogLoadList,
};

/**
 * Blog page
 */
class Blog extends Component<IProps> {
  private readonly source: Source<IBlog>;

  constructor(props: IProps) {
    super(props);
    const { appLoading, blogLoadList } = props;
    this.source = new Source<IBlog>(
      'blog',
      () => {
        appLoading({ loading: true });
      },
      (data) => {
        blogLoadList({ items: data });
      }
    );
  }

  public componentDidMount(): void {
    const { items } = this.props;
    if (!items.length) {
      this.source.getList();
    }
  }

  public render(): ReactNode {
    const { items } = this.props;
    return (
      <Container>
        <div className='flexBox flexColumn'>{this.getContent(items)}</div>
      </Container>
    );
  }

  private getContent = (blogList: IBlog[]): ReactNode[] =>
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
