import { combineReducers, createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { PageContainer } from 'src/container';
import { IAppState } from 'src/interface/IState';

const app = (): IAppState => ({ loading: false });

const store = createStore(combineReducers({ app }));

describe('Container', () => {
  test('with title', () => {
    const title = 'title 1';
    const content = <div>text1</div>;
    const component = renderer.create(
      <Provider store={store}>
        <PageContainer title={title}>{content}</PageContainer>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('without title', () => {
    const content = <div>text1</div>;
    const component = renderer.create(
      <Provider store={store}>
        <PageContainer>{content}</PageContainer>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
