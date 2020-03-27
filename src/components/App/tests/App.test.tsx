import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import { App } from 'components';
import store from 'store';

test('App', () => {
  const component = renderer.create(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
