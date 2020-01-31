import React from 'react';
import renderer from 'react-test-renderer';
import Container from '../../components/Page/Container';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

const app = () => ({ loading: false });

const store = createStore(combineReducers({ app }));

test('Container', () => {
  const title = 'title 1';
  const content = <div>text1</div>;
  const component = renderer.create(
    <Provider store={store}>
      <Container title={title}>{content}</Container>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Container', () => {
  const content = <div>text1</div>;
  const component = renderer.create(
    <Provider store={store}>
      <Container>{content}</Container>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
