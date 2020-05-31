import React, { FunctionComponent } from 'react';
import { contacts } from 'src/assets';
import { PageContainer } from 'src/components/Pages';
import { BLANK, CONTACTS, REL } from 'src/const';
import styles from './Contacts.module.scss';

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
const Contacts: FunctionComponent = () => (
  <PageContainer title={CONTACTS.name} Icon={CONTACTS.Icon}>
    <div className={`flexBox alignItemsBaseline justifyContentBetween ${styles.container}`}>
      <div>{titles}</div>
      <div className={styles.item}>{items}</div>
    </div>
  </PageContainer>
);

export default Contacts;
