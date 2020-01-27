import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Menu from "./Navigation/Menu";
import Main from "./Page/Main";
import About from "./Page/About";
import Blog from "./Page/Blog";
import Career from "./Page/Career";
import Contacts from "./Page/Contacts";
import NotFound from "./Page/NotFound";
import IState from "../interface/IState";
import { connect, DispatchProp } from "react-redux";
import { MAIN } from "../constants/Pages";

export interface IProperties extends DispatchProp {
  navigation: { activePage: string };
}

/**
 * Main application component
 */
const App = ({ dispatch, navigation }: IProperties) => (
  <div className="flexBox flexColumn">
    <Menu dispatch={dispatch} activePage={navigation.activePage} />
    <div className="components-app__background" />
    <div className="flexBox flexColumn components-app__content">
      <Switch>
        <Route exact={true} path="" component={Main} />
        <Route path="about" component={About} />
        <Route path="blog" component={Blog} />
        <Route path="career" component={Career} />
        <Route path="contacts" component={Contacts} />
        <Route component={NotFound} />
      </Switch>
    </div>
    <div className="components-app__rights">© 2019 All rights reserved</div>
  </div>
);

/**
 * Component state to props mapping function
 * @param {IState} state
 * @param {Object} ownProps
 */
const mapStateToProps = (
  { navigation }: IState,
  ownProps: { location: { pathname: string } }
) => {
  const { activePage } = navigation;
  if (activePage) {
    return { navigation: { activePage } };
  }
  // We need to set default page on first login
  const paths = ownProps.location.pathname.split("/");
  return { navigation: { activePage: paths[1] || MAIN.id } };
};

export default connect(mapStateToProps)(App);
