import React from "react";
import { HashRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Menu from "../../components/Navigation/Menu";
import { MAIN } from "../../constants/Pages";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { navigation } from "../../reducers";

test("Menu", () => {
  const store = createStore(combineReducers({ navigation }));

  const component = renderer.create(
    <Provider store={store}>
      <HashRouter>
        <Menu activePage={MAIN.id} dispatch={store.dispatch} />
      </HashRouter>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
