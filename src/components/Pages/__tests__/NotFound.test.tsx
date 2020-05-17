import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Link, Router } from 'react-router-dom';
import { combineReducers, createStore } from 'redux';
import { history } from 'src/components/App';
import NotFound from 'src/components/Pages/NotFound';
import { PageContainer } from 'src/container';
import { IAppState } from 'src/types';

describe('NotFound', () => {
  const app = (): IAppState => ({ loading: false });

  const store = createStore(combineReducers({ app }));

  const component = mount(
    <Provider store={store}>
      <Router history={history}>
        <NotFound />
      </Router>
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
