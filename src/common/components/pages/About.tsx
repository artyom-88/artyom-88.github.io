import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { bio } from 'assets';
import PageContainer from 'common/components/pages/PageContainer';
import { ABOUT_PAGE_META } from 'common/const/pages.const';
import { ReactElement } from 'react';
import useStyles from './About.styles';

export const TITLE = 'Artem Ganev';

/**
 * About page component
 */
const About = (): ReactElement => {
  const classes = useStyles();
  return (
    <PageContainer title={ABOUT_PAGE_META.name} Icon={ABOUT_PAGE_META.Icon}>
      <Card raised>
        <CardContent>
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
