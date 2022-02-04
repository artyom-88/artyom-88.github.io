import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import bio from 'assets/data/bio.json';
import PageContainer from 'common/components/pages/PageContainer';
import { ABOUT_PAGE_META } from 'common/const/pages.const';
import { ReactElement } from 'react';
import useStyles from './About.styles';

const TITLE = 'Hi! My name is Artyom.';

const IMAGE = 'https://res.cloudinary.com/hia8f154d/image/upload/v1643992397/artyom.jpg';

const About = (): ReactElement => {
  const classes = useStyles();
  return (
    <PageContainer Icon={ABOUT_PAGE_META.Icon}>
      <Card raised>
        <CardContent>
          <CardMedia className={classes.aboutPageImage} image={IMAGE} title='Artyom' />
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
