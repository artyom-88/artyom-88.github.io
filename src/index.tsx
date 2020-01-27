import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { HashRouter, Route } from "react-router-dom";
import { navigation } from "./reducers";
import "./index.scss";

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
