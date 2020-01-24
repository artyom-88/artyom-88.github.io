import React from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";

const PAGES = [
  { name: "Main", url: "" },
  { name: "About", url: "about" },
  { name: "Blog", url: "blog" },
  { name: "Career", url: "career" },
  { name: "Contacts", url: "contacts" }
];

const items = PAGES.map(({ name, url }) => (
  <Link className="nav-menu__item" to={`/${url}`} key={name}>
    {name}
  </Link>
));

/**
 * Navigation menu
 */
export default () => (
  <div className="flexBox nav-menu__root" id="menu">
    {items}
  </div>
);
