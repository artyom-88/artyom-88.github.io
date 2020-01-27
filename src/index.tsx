import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import App from "./components/App";
import "./index.scss";
import { navigation } from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import { HashRouter, Route } from "react-router-dom";

const store = createStore(combineReducers({ navigation }));

/**
 * Site root component
 */
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Route component={App} />
    </HashRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
