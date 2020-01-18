import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App';
import Menu from '../components/Navigation/Menu';

test('App', () => {
    const component = renderer.create(<App/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});