import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { App } from 'src/components';
import { Content, Footer, Header } from 'src/components/Layout';
import store from 'src/store';

describe('App', () => {
  const component = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );

  it('Should render Header', () => {
    expect(component.find(Header)).toHaveLength(1);
  });

  it('Should render Content', () => {
    expect(component.find(Content)).toHaveLength(1);
  });

  it('Should render Footer', () => {
    expect(component.find(Footer)).toHaveLength(1);
  });
});
