import React from 'react';
import renderer from 'react-test-renderer';
import GitHub from '../../../components/Page/Main/GitHub';

test('GitHub', () => {
  const component = renderer.create(<GitHub />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
