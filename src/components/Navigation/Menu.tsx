import React, { MouseEvent, MouseEventHandler } from "react";
import { DispatchProp } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { navigate } from "../../actions";
import "./Menu.scss";
import { MAIN, PAGES } from "../../constants/Pages";

export interface IProperties extends DispatchProp {
  activePage: string;
}

const clickWrapper = (dispatch: Dispatch) => (id: string) => () => dispatch(navigate(id));

const getItems = (
  activePage: string,
  clickHandler: (id: string) => MouseEventHandler<HTMLAnchorElement>
) =>
  PAGES.map(({ id, name, url }) => (
    <Link
      className={`nav-menu__item${activePage === id ? " active" : ""}`}
      to={`/${url}`}
      key={id}
      onClick={clickHandler(id)}
    >
      {name}
    </Link>
  ));

/**
 * Navigation menu
 */
export default ({ dispatch, activePage = MAIN.id }: IProperties) => (
  <div className="flexBox nav-menu__root" id="menu">
    {getItems(activePage, clickWrapper(dispatch))}
  </div>
);
