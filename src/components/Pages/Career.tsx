import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import * as actions from 'src/actions';
import { APP_LOADING, CAREER_LOAD_LIST } from 'src/actions';
import { BLANK, REL } from 'src/const';
import { AbstractDataContainer } from 'src/container';
import { IAppLoading, ICareerRawData, IDataProps, ILoadCareerList, IState, Source } from 'src/interface';
import { CareerModel, createSource } from 'src/model';
import { careerItemsSelector } from 'src/selectors';
import styles from './Career.module.scss';

interface IDispatchProps {
  appLoading: typeof actions.appLoading;
  careerLoadList: typeof actions.careerLoadList;
}

type Props = IDataProps<CareerModel> & IDispatchProps;

const mapStateToProps = (state: IState): IDataProps<CareerModel> => ({ items: careerItemsSelector(state) });

const mapDispatch: IDispatchProps = {
  appLoading: (loading: boolean): IAppLoading => ({
    type: APP_LOADING,
    payload: { loading },
  }),
  careerLoadList: (items: CareerModel[]): ILoadCareerList => ({
    type: CAREER_LOAD_LIST,
    payload: { items },
  }),
};

const createModel = ({ id, title, description, post, site, tools, startDate, endDate }: ICareerRawData): CareerModel =>
  // prettier-ignore
  CareerModel.create()
    .description(description)
    .post(post)
    .site(site)
    .tools(tools)
    .startDate(startDate)
    .endDate(endDate)
    .title(title)
    .id(id)
    .build();

/**
 * Career page
 */
class Career extends AbstractDataContainer<CareerModel, Props> {
  private readonly source: Source;

  constructor(props: Props) {
    super(props);
    const { appLoading, careerLoadList } = props;
    this.source = createSource<ICareerRawData>()
      .endpoint('career')
      .beforeLoad(() => appLoading(true))
      .afterLoad((data: ICareerRawData[]) => careerLoadList(data.map(createModel)))
      .build();
  }

  protected getSource = (): Source => this.source;

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
  protected getContent = (careerList: CareerModel[]): ReactNode => {
    return careerList.map((item: CareerModel) => {
      const { id, site, title, post, description, tools } = item;
      return (
        <div key={id} className={styles.item}>
          {this.prepareTitle(site, title)}
          <div className={styles.dates}>{item.formatDates()}</div>
          <div>Post:&nbsp;{post}</div>
          <div>{description}</div>
          <div className='flexBox flexColumn'>
            <div>Tools:&nbsp;{tools}</div>
          </div>
        </div>
      );
    });
  };
}

export default connect<IDataProps<CareerModel>, IDispatchProps, {}, IState>(mapStateToProps, mapDispatch)(Career);
