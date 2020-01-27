import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore, Store } from "redux";
import App from "./components/App";
import "./index.scss";
import { navigation } from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import { MAIN } from "./constants/Pages";
import IState from "./interface/IState";

const initialStore = { navigation: { activePage: MAIN.id } };

const store = createStore(combineReducers({ navigation }));

/**
 * Site root
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
