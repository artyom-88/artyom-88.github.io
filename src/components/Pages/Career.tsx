import { careerLoadList } from 'actions';
import { PageContainer } from 'components/Pages';
import { BLANK, CAREER, REL } from 'const';
import { CareerModel } from 'model';
import React, { FC, ReactNode, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getCareerListItems } from 'selectors';
import { IState } from 'types';
import styles from './Career.module.scss';

const prepareTitle = (site: string, title: string): ReactNode => {
  const header = <h3>{title}</h3>;
  return site ? (
    <a href={site} target={BLANK} rel={REL} title='Click for details'>
      {header}
    </a>
  ) : (
    <h3>{title}</h3>
  );
};

const useCareerItems = (): CareerModel[] => {
  const items = useSelector<IState, CareerModel[]>(getCareerListItems, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(careerLoadList());
  }, [dispatch]);

  return items;
};

const Career: FC = () => {
  const items: CareerModel[] = useCareerItems();
  return (
    <PageContainer title={CAREER.name} Icon={CAREER.Icon}>
      {items.map((item: CareerModel) => {
        const { id, site, title, post, description, tools } = item;
        return (
          <div key={id} className={styles.item}>
            {prepareTitle(site, title)}
            <div className={styles.dates}>{item.formatDates()}</div>
            <div>Post:&nbsp;{post}</div>
            <div>{description}</div>
            <div className='flexBox flexColumn'>
              <div>Tools:&nbsp;{tools}</div>
            </div>
          </div>
        );
      })}
    </PageContainer>
  );
};

export default Career;
