import store from 'app/store';
import App from 'common/components/App';
import ErrorBoundary from 'common/components/ErrorBoundary';
import Footer from 'common/components/layout/Footer';
import Header from 'common/components/layout/Header';
import Routes from 'common/components/Routes';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

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

  it('Should render ErrorBoundary', () => {
    expect(component.find(ErrorBoundary)).toHaveLength(1);
  });

  it('Should render Routes', () => {
    expect(component.find(Routes)).toHaveLength(1);
  });

  it('Should render Footer', () => {
    expect(component.find(Footer)).toHaveLength(1);
  });
});
