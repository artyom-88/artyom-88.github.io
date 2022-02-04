import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import PageContainer from 'common/components/pages/PageContainer';
import { BLANK, REL } from 'common/const/html.const';
import { CAREER_PAGE_META } from 'common/const/pages.const';
import useListItems from 'common/hooks/useListItems';
import selectors from 'features/career/career.selector';
import { actions } from 'features/career/career.slice';
import { CareerModel, CareerState } from 'features/career/career.types';
import { formatDates } from 'features/career/career.utils';
import { ReactElement, ReactNode } from 'react';
import useStyles from './Career.styles';

const prepareTitle = (site: string, title: string, className: string): ReactNode => {
  const header = (
    <Typography variant='h5' className={className}>
      {title}
    </Typography>
  );
  return site ? (
    <a href={site} target={BLANK} rel={REL} title='Click for details'>
      {header}
    </a>
  ) : (
    header
  );
};

const Career = (): ReactElement => {
  const classes = useStyles();
  const { isLoading, items } = useListItems<CareerState, CareerModel>(actions, selectors);
  return (
    <PageContainer isLoading={isLoading} title={CAREER_PAGE_META.name} Icon={CAREER_PAGE_META.Icon}>
      {items.map((item) => {
        const { _id, site, title, post, description, tools } = item;
        return (
          <div key={_id} className={classes.careerItem}>
            <Card raised>
              <div className={classes.careerItemContent}>
                {prepareTitle(site, title, classes.careerTitle)}
                <Typography variant='h6' paragraph className={classes.careerDates}>
                  {formatDates(item)}
                </Typography>
                <Typography variant='h6'>Post:&nbsp;{post}</Typography>
                <Typography variant='h6' paragraph>
                  {description}
                </Typography>
                <div className='ag-flexbox ag-flexColumn'>
                  <Typography variant='h6' paragraph>
                    Tools:&nbsp;{tools}
                  </Typography>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </PageContainer>
  );
};

export default Career;
