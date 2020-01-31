import React from 'react';
import { HashRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import NotFound from '../../components/Page/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

test('NotFound', () => {
  const app = () => ({ loading: false });

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
