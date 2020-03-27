import React from 'react';
import renderer from 'react-test-renderer';

import { LoadingIndicator } from 'components/Navigation';

test('LoadingIndicator', () => {
  const component = renderer.create(<LoadingIndicator />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
