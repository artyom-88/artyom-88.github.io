import React from 'react';
import { HashRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { Menu } from 'components/Navigation';

test('Menu', () => {
  const component = renderer.create(
    <HashRouter>
      <Menu />
    </HashRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
