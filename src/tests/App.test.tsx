import React from "react";
import renderer from "react-test-renderer";
import App from "../components/App";
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { navigation } from "../reducers";

test("App", () => {
  const store = createStore(combineReducers({ navigation }));

  const component = renderer.create(
    <Provider store={store}>
      <HashRouter>
        <Route component={App} />
      </HashRouter>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
