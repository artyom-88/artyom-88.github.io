import React from 'react';
import renderer from 'react-test-renderer';
import LoadingIndicator from '../../components/Navigation/LoadingIndicator';

test('LoadingIndicator', () => {
    const component = renderer.create(<LoadingIndicator/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});