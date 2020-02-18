import React from 'react';
import { BLANK, REL } from '../../constants/Html';
import contacts from '../../resources/contacts.json';
import styles from './Contacts.module.scss';
import Container from './Container';

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
const titles = contacts.data.map(({ key, value }: IContact) => <div key={key}>{value}:&nbsp;</div>);

/**
 * Contacts items markup
 */
const items = contacts.data.map(({ key, link, title }: IContact) => (
  <div key={key}>
    <a href={link} target={BLANK} rel={REL}>
      {title}
    </a>
  </div>
));

/**
 * Contacts page component
 */
const Contacts = () => (
  <Container>
    <div className={`flexBox alignItemsBaseline justifyContentBetween ${styles.container}`}>
      <div>{titles}</div>
      <div className={styles.item}>{items}</div>
    </div>
  </Container>
);

export default Contacts;
