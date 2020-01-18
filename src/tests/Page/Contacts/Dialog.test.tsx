import React from 'react';
import renderer from 'react-test-renderer';
import Dialog from '../../../components/Page/Contacts/Dialog';

test('Dialog', () => {
    const handler = () => {
        // Test if close click have happened
    };
    const component = renderer.create(<Dialog closeHandler={ handler }/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});