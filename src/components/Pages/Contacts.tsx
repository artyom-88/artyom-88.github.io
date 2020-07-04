import Box from '@material-ui/core/Box';
import { contacts } from 'assets';
import { PageContainer } from 'components/Pages';
import useStyles from 'components/Pages/Contacts.styles';
import { BLANK, CONTACTS, REL } from 'const';
import React, { FC } from 'react';

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
 * Contacts titles markup
 */
const titles = contacts.data.map(({ key, value }: IContact) => (
  <Box key={key} py={1} pr={2}>
    {value}:&nbsp;
  </Box>
));

/**
 * Contacts items markup
 */
const items = contacts.data.map(({ key, link, title }: IContact) => (
  <Box key={key} py={1} pl={2}>
    <a href={link} target={BLANK} rel={REL}>
      {title}
    </a>
  </Box>
));

/**
 * Contacts page component
 */
const Contacts: FC = () => {
  const classes = useStyles();
  return (
    <PageContainer centerTitle title={CONTACTS.name} Icon={CONTACTS.Icon}>
      <Box alignItems='baseline' className={classes.contactsContainer} justifyContent='center' display='flex'>
        <div>{titles}</div>
        <div className={classes.contactsItem}>{items}</div>
      </Box>
    </PageContainer>
  );
};

export default Contacts;
