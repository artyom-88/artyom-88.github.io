import React, { ReactNode } from 'react';
import { BLANK, REL } from '../../constants/Html';
import { ICareer } from '../../interface/ICareer';
import { connect } from 'react-redux';
import IState from '../../interface/IState';
import * as actions from '../../actions';
import DateUtil from '../../utils/Date';
import Abstract, { IProps as IAbstractProps } from './Data/Abstract';
import './Career.scss';
import Source from '../../model/Source';

const mapStateToProps = ({ career: { items } }: IState) => {
  return {
    items: Object.values(items),
  };
};

const actionCreators = {
  appLoading: actions.appLoading,
  careerLoadList: actions.careerLoadList,
};

interface IProps<TData> extends IAbstractProps<TData> {
  appLoading: (payload: { loading: boolean }) => void;
  careerLoadList: (payload: { items: TData[] }) => void;
}

/**
 * Career page
 */
class Career extends Abstract<ICareer, IProps<ICareer>> {
  private readonly source: Source<ICareer>;

  constructor(props: IProps<ICareer>) {
    super(props);
    const { appLoading, careerLoadList } = props;
    this.source = new Source<ICareer>(
      'career',
      () => {
        appLoading({ loading: true });
      },
      (data: ICareer[]) => {
        careerLoadList({ items: data });
      }
    );
  }

  protected getSource = (): Source<ICareer> => this.source;

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
  protected getContent = (careerList: ICareer[]): ReactNode => {
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
