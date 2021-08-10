import App from 'components/App';
import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import Routes from 'components/Navigation/Routes';
import { mount } from 'enzyme';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from 'store';

describe('App', () => {
  const component = mount(
    <Suspense fallback={null}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
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
