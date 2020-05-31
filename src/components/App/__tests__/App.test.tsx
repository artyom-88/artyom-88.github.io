import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { App } from 'src/components';
import { Footer, Header } from 'src/components/Layout';
import { Routes } from 'src/components/Navigation';
import store from 'src/store';

describe('App', () => {
  const component = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );

  it('Should render HashRouter', () => {
    expect(component.find(HashRouter)).toHaveLength(1);
  });

  it('Should render Header', () => {
    expect(component.find(Header)).toHaveLength(1);
  });

  it('Should render Routes', () => {
    expect(component.find(Routes)).toHaveLength(1);
  });

  it('Should render Footer', () => {
    expect(component.find(Footer)).toHaveLength(1);
  });
});
