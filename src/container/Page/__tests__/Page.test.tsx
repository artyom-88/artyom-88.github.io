import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { LoadingIndicator } from 'src/components/Navigation';
import { PageContainer } from 'src/container';
import { IAppState } from 'src/types';

describe('Container', () => {
  const titleMock = 'title 1';
  const Content: FunctionComponent = () => <div>text1</div>;

  const render = (loading = false): ReactWrapper => {
    const app = (): IAppState => ({ loading });
    const store = createStore(combineReducers({ app }));
    return mount(
      <Provider store={store}>
        <PageContainer title={titleMock}>
          <Content />
        </PageContainer>
      </Provider>
    );
  };

  describe('loading', () => {
    const component = render(true);

    it('Should render loader', () => {
      expect(component.find(LoadingIndicator)).toHaveLength(1);
    });

    it("Shouldn't render title", () => {
      const title = component.find('h2');
      expect(title).toHaveLength(0);
    });

    it("Shouldn't render content", () => {
      expect(component.find(Content)).toHaveLength(0);
    });
  });

  describe('loaded', () => {
    const component = render();

    it("Shouldn't render loader", () => {
      expect(component.find(LoadingIndicator)).toHaveLength(0);
    });

    it('Should render title', () => {
      const title = component.find('h2');
      expect(title).toHaveLength(1);
      expect(toJson(title)).toMatchSnapshot();
    });

    it('Should render content', () => {
      expect(component.find(Content)).toHaveLength(1);
    });
  });
});
