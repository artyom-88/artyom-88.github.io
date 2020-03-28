import { combineReducers, createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { NotFound } from 'src/components/Pages';
import { IAppState } from 'src/interface/IState';

test('NotFound', () => {
  const app = (): IAppState => ({ loading: false });

  const store = createStore(combineReducers({ app }));

  const component = renderer.create(
    <Provider store={store}>
      <HashRouter>
        <NotFound />
      </HashRouter>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
