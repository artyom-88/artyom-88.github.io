import Typography from '@material-ui/core/Typography';
import { shallow, ShallowWrapper } from 'enzyme';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { LoadingIndicator } from 'src/components/Navigation';
import { PageContainer } from 'src/components/Pages';

jest.mock('react-redux');

describe('Container', () => {
  const titleMock = 'title 1';
  const Content: FunctionComponent = () => <div>text1</div>;

  const render = (loading = false): ShallowWrapper => {
    (useSelector as jest.Mock).mockReturnValue(loading);
    return shallow(
      <PageContainer title={titleMock}>
        <Content />
      </PageContainer>
    );
  };

  describe('loading', () => {
    const component = render(true);

    it('Should render loader', () => {
      expect(component.find(LoadingIndicator)).toHaveLength(1);
    });

    it("Shouldn't render title", () => {
      const title = component.find(Typography);
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
      const title = component.find(Typography);
      expect(title).toHaveLength(1);
      expect(title.prop('children')).toEqual(titleMock);
    });

    it('Should render content', () => {
      expect(component.find(Content)).toHaveLength(1);
    });
  });
});
