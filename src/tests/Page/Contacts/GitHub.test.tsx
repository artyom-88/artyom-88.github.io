import { combineReducers, createStore } from 'redux';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import React from 'react';
import GitHub from '../../../components/Page/Main/GitHub';

test('GitHub', () => {
  const app = () => ({ contribution: { svg: null } });
  const store = createStore(combineReducers({ app }));
  const component = renderer.create(
    <Provider store={store}>
      <GitHub />
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
