import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import PageContainer from 'common/components/pages/PageContainer';
import { BLANK, REL } from 'common/const/html.const';
import { CAREER } from 'common/const/pages.const';
import { useCareerItems } from 'features/career/career.hooks';
import { CareerModel } from 'features/career/career.types';
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
  const items: CareerModel[] = useCareerItems();
  return (
    <PageContainer title={CAREER.name} Icon={CAREER.Icon}>
      {items.map((item: CareerModel) => {
        const { _id, site, title, post, description, tools } = item;
        return (
          <Box key={_id} mb={2}>
            <Card raised>
              <Box className={classes.careerItem} p={2}>
                {prepareTitle(site, title, classes.careerTitle)}
                <Typography variant='h6' paragraph className={classes.careerDates}>
                  {formatDates(item)}
                </Typography>
                <Typography variant='h6'>Post:&nbsp;{post}</Typography>
                <Typography variant='h6' paragraph>
                  {description}
                </Typography>
                <Box display='flex' flexDirection='column'>
                  <Typography variant='h6' paragraph>
                    Tools:&nbsp;{tools}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Box>
        );
      })}
    </PageContainer>
  );
};

export default Career;
