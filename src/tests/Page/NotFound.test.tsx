import React from 'react';
import { HashRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import NotFound from '../../components/Page/NotFound';


test('NotFound', () => {
    const component = renderer.create((
        <HashRouter>
            <NotFound/>
        </HashRouter>
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});