import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React, { FunctionComponent } from 'react';
import { bio } from 'src/assets';
import { PageContainer } from 'src/components/Pages';
import { ABOUT } from 'src/const';
import useStyles from './styles';

export const TITLE = 'Artem Ganev';

/**
 * About page component
 */
const About: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <PageContainer title={ABOUT.name} Icon={ABOUT.Icon}>
      <Card className={classes.aboutPageCard} raised>
        <CardContent className={classes.aboutPageContent}>
          <Typography variant='h4' paragraph>
            {TITLE}
          </Typography>
          {bio.data.map((value: string, key: number) => (
            <Typography key={key} className={classes.aboutPageBlock} paragraph variant='h6'>
              {value}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default About;
