import React from "react";
import { BLANK, REL } from "../../constants/Html";
import contacts from "../../resources/contacts.json";
import "./Contacts.scss";
import Container from "./Container";

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
  <div key={key}>{value}:&nbsp;</div>
));

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
 * Page content
 */
const content = (
  <div className="flexBox alignItemsBaseline justifyContentBetween page-contacts__root">
    <div>{titles}</div>
    <div className="page-contacts__item">{items}</div>
  </div>
);

/**
 * Contacts page component
 */
export default () => <Container content={content} />;
