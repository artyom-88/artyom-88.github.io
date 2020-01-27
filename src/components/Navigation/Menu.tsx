import React, { MouseEventHandler } from "react";
import { DispatchProp } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { navigate } from "../../actions";
import { MAIN, PAGES } from "../../constants/Pages";
import { INavigateAction } from "../../interface/Actions";
import "./Menu.scss";

export interface IProperties extends DispatchProp<INavigateAction> {
  activePage: string;
}

/**
 * Menu item click wrapper function
 * Transfers menu item id and dispatching function to click handler
 * @param {Function} dispatch dispatching function
 */
const clickWrapper = (dispatch: Dispatch<INavigateAction>) => (
  id: string
) => () => dispatch(navigate(id));

/**
 * Menu items render function
 * @param {String} activePage Active menu item id
 * @param {Function} clickHandler Menu item click handler
 */
const renderItems = (
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
 * /**
 * Navigation menu component
 * @param {Function} dispatch dispatching function
 * @param {String} activePage Active menu item id
 */
export default ({ dispatch, activePage = MAIN.id }: IProperties) => (
  <div className="flexBox nav-menu__root" id="menu">
    {renderItems(activePage, clickWrapper(dispatch))}
  </div>
);
