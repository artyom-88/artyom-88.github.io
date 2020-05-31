import Typography from '@material-ui/core/Typography';
import React, { FunctionComponent } from 'react';
import { bio } from 'src/assets';
import { PageContainer } from 'src/components/Pages';
import useStyles from './styles';

/**
 * About page component
 */
const About: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <PageContainer title='Artyom Ganev'>
      {bio.data.map((value: string, key: number) => (
        <Typography key={key} className={classes.aboutPageBlock} paragraph>
          {value}
        </Typography>
      ))}
    </PageContainer>
  );
};

export default About;
