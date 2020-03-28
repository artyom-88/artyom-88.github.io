import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as actions from 'src/actions';
import { BLANK, REL } from 'src/const';
import { AbstractDataContainer } from 'src/container';
import { ICareer, ICareerItems } from 'src/interface/ICareer';
import { IDataProps } from 'src/interface/IData';
import { ISource } from 'src/interface/ISource';
import IState from 'src/interface/IState';
import { createSource } from 'src/model';
import { DateUtil } from 'src/utils';
import styles from './Career.module.scss';

interface IProps<TData> extends IDataProps<TData> {
  appLoading: (payload: { loading: boolean }) => void;
  careerLoadList: (payload: { items: TData[] }) => void;
}

const itemsSelector = createSelector(
  ({ career }: IState) => career,
  (career: { items: ICareerItems }) => Object.values(career.items)
);

const mapStateToProps = (state: IState): IDataProps<ICareer> => ({ items: itemsSelector(state) });

const actionCreators = {
  appLoading: actions.appLoading,
  careerLoadList: actions.careerLoadList,
};

/**
 * Career page
 */
class Career extends AbstractDataContainer<ICareer, IProps<ICareer>> {
  private readonly source: ISource;

  constructor(props: IProps<ICareer>) {
    super(props);
    const { appLoading, careerLoadList } = props;
    this.source = createSource<ICareer>()
      .endpoint('career')
      .beforeLoad(() => {
        appLoading({ loading: true });
      })
      .afterLoad((data: ICareer[]) => {
        careerLoadList({ items: data });
      })
      .build();
  }

  protected getSource = (): ISource => this.source;

  private prepareTitle = (site: string, title: string): ReactNode => {
    const header = <h3>{title}</h3>;
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
      <div key={id} className={styles.item}>
        {this.prepareTitle(site, title)}
        <div className={styles.dates}>{DateUtil.prepareDates(startDate, endDate)}</div>
        <div>Post:&nbsp;{post}</div>
        <div>{description}</div>
        <div className='flexBox flexColumn'>
          <div>Tools:&nbsp;{tools}</div>
        </div>
      </div>
    ));
  };
}

export default connect(mapStateToProps, actionCreators)(Career);
