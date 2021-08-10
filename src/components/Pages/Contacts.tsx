import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { contacts } from 'assets';
import PageContainer from 'components/Pages/PageContainer';
import { BLANK, CONTACTS, REL } from 'const';
import { useIsNarrow } from 'hooks';
import { ReactElement, ReactNode, useMemo } from 'react';
import useStyles from './Contacts.styles';

/**
 * Contact options interface
 */
interface IContact {
  key: string;
  value: string;
  link: string;
  title: string;
}

/**
 * Contacts items markup
 */
const renderItems = (narrow: boolean): ReactNode[] => {
  const padding = narrow ? 1 : 2;
  const justifyContent = narrow ? 'space-between' : 'center';
  return contacts.data.map(({ key, link, title, value }: IContact) => (
    <Typography key={key} variant='h6'>
      <Box alignItems='baseline' display='flex' justifyContent={justifyContent}>
        <Box p={padding}>{value}:&nbsp;</Box>
        <Box p={padding}>
          <a href={link} target={BLANK} rel={REL}>
            {title}
          </a>
        </Box>
      </Box>
    </Typography>
  ));
};

/**
 * Contacts page component
 */
const Contacts = (): ReactElement => {
  const classes = useStyles();
  const narrow = useIsNarrow();
  const items = useMemo(() => renderItems(narrow), [narrow]);

  return (
    <PageContainer centerTitle title={CONTACTS.name} Icon={CONTACTS.Icon}>
      <Box className={classes.contactsContainer}>{items}</Box>
    </PageContainer>
  );
};

export default Contacts;
