import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom';
import { combineReducers, createStore } from 'redux';
import { PageContainer } from 'src/components/Pages';
import NotFound from 'src/components/Pages/NotFound';
import { IAppState } from 'src/types';

describe('NotFound', () => {
  const app = (): IAppState => ({ loading: false });

  const store = createStore(combineReducers({ app }));

  const component = mount(
    <Provider store={store}>
      <HashRouter>
        <NotFound />
      </HashRouter>
    </Provider>
  );

  it('Should render PageContainer', () => {
    expect(component.find(PageContainer)).toHaveLength(1);
  });

  it('Should render Link', () => {
    const link = component.find(Link);
    expect(link).toHaveLength(1);
  });
});
