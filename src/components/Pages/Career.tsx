import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { PageContainer, useCareerItems } from 'components/Pages';
import useStyles from 'components/Pages/Career.styles';
import { BLANK, CAREER, REL } from 'const';
import { CareerModel } from 'model';
import React, { FC, ReactNode } from 'react';

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

const Career: FC = () => {
  const classes = useStyles();
  const items: CareerModel[] = useCareerItems();
  return (
    <PageContainer title={CAREER.name} Icon={CAREER.Icon}>
      {items.map((item: CareerModel) => {
        const { id, site, title, post, description, tools } = item;
        return (
          <Box key={id} mr={2} mb={2}>
            <Card raised>
              <Box className={classes.careerItem} px={2} pt={2}>
                {prepareTitle(site, title, classes.careerTitle)}
                <Typography variant='h6' paragraph className={classes.careerDates}>
                  {item.formatDates()}
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
