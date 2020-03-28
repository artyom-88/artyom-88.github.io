import React from 'react';
import renderer from 'react-test-renderer';

import { LoadingIndicator } from 'src/components/Navigation';

test('LoadingIndicator', () => {
  const component = renderer.create(<LoadingIndicator />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
