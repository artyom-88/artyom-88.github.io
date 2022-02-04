import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { artyom, bio } from 'assets';
import PageContainer from 'common/components/pages/PageContainer';
import { ABOUT_PAGE_META } from 'common/const/pages.const';
import { ReactElement } from 'react';
import useStyles from './About.styles';

export const TITLE = 'Hi! My name is Artyom.';

const About = (): ReactElement => {
  const classes = useStyles();
  return (
    <PageContainer Icon={ABOUT_PAGE_META.Icon}>
      <Card raised>
        <CardContent>
          <CardMedia className={classes.aboutPageImage} image={artyom} title='Artyom' />
          <Typography variant='h4' paragraph>
            {TITLE}
          </Typography>
          {bio.data.map((value: string, key: number) => (
            <div className='ag-flexbox' key={key}>
              <RadioButtonUncheckedOutlinedIcon />
              <Typography className={classes.aboutPageBlock} paragraph variant='h6'>
                {value}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default About;
