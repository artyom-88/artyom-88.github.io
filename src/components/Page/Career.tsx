import React, { Component, ReactNode } from 'react';
import { BLANK, REL } from '../../constants/Html';
import { ICareer } from '../../interface/ICareer';
import { connect } from 'react-redux';
import IState from '../../interface/IState';
import * as actions from '../../actions';
import Source from '../../model/Source';
import Container from './Container';
import DateUtil from '../../utils/Date';
import './Career.scss';

interface IProps {
  items: ICareer[];
  appLoading: (payload: { loading: boolean }) => void;
  careerLoadList: (payload: { items: ICareer[] }) => void;
}

const mapStateToProps = ({ career: { items } }: IState) => {
  return {
    items: Object.values(items),
  };
};

const actionCreators = {
  appLoading: actions.appLoading,
  careerLoadList: actions.careerLoadList,
};

/**
 * Career page
 */
class Career extends Component<IProps> {
  private readonly source: Source<ICareer>;

  constructor(props: IProps) {
    super(props);
    const { appLoading, careerLoadList } = props;
    this.source = new Source<ICareer>(
      'career',
      () => {
        appLoading({ loading: true });
      },
      (data) => {
        careerLoadList({ items: data });
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

  private prepareTitle = (site: string, title: string) => {
    const header = <h3 className='page-career__title'>{title}</h3>;
    return site ? (
      <a href={site} target={BLANK} rel={REL} title='Click for details'>
        {header}
      </a>
    ) : (
      <h3>{title}</h3>
    );
  };

  /**
   * Career items markup
   */
  private getContent = (careerList: ICareer[]): ReactNode => {
    return careerList.map(({ id, site, title, startDate, endDate, post, description, tools }: ICareer) => (
      <div key={id} className='page-career__item'>
        {this.prepareTitle(site, title)}
        <div className='page-career__dates'>{DateUtil.prepareDates(startDate, endDate)}</div>
        <div className=''>Post:&nbsp;{post}</div>
        <div className=''>{description}</div>
        <div className='flexBox flexColumn'>
          <div className=''>Tools:&nbsp;{tools}</div>
        </div>
      </div>
    ));
  };
}

export default connect(mapStateToProps, actionCreators)(Career);
