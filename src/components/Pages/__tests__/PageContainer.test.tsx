import Typography from '@material-ui/core/Typography';
import LoadingIndicator from 'components/Navigation/LoadingIndicator';
import PageContainer from 'components/Pages/PageContainer';
import { shallow, ShallowWrapper } from 'enzyme';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

jest.mock('react-redux');

describe('PageContainer', () => {
  const titleMock = 'title 1';
  const Content: FC = () => <div>text1</div>;

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
