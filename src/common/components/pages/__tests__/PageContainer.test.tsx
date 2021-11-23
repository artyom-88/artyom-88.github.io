import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PageContainer from 'common/components/pages/PageContainer';
import useIsNarrow from 'common/hooks/useIsNarrow';
import { shallow, ShallowWrapper } from 'enzyme';
import React, { FC } from 'react';

jest.mock('common/hooks/useIsNarrow');

describe('PageContainer', () => {
  const titleMock = 'title 1';
  const Content: FC = () => <div>text1</div>;

  const render = (isNarrow = false): ShallowWrapper => {
    (useIsNarrow as jest.Mock).mockReturnValue(isNarrow);
    return shallow(
      <PageContainer title={titleMock}>
        <Content />
      </PageContainer>
    );
  };

  describe('narrow', () => {
    const component = render(true);

    it('Should render Paper', () => {
      expect(component.find(Paper)).toHaveLength(1);
    });

    it('Should render title', () => {
      const title = component.find(Typography);
      expect(title).toHaveLength(1);
    });

    it('Should render content', () => {
      expect(component.find(Content)).toHaveLength(1);
    });
  });

  // TODO: rework tests
  describe('wide', () => {
    const component = render();

    it('Should render Paper', () => {
      expect(component.find(Paper)).toHaveLength(1);
    });

    it('Should render title', () => {
      const title = component.find(Typography);
      expect(title).toHaveLength(1);
    });

    it('Should render content', () => {
      expect(component.find(Content)).toHaveLength(1);
    });
  });
});
