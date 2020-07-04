import Card from '@material-ui/core/Card';
import { BLOG_ITEMS_MOCK } from '__mocks__';
import { PageContainer } from 'components/Pages';
import Blog from 'components/Pages/Blog';
import { useBlogItems } from 'components/Pages/Pages.hooks';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

jest.mock('components/Pages/Pages.hooks');

describe('Blog page', () => {
  (useBlogItems as jest.Mock).mockReturnValue(BLOG_ITEMS_MOCK);

  const wrapper: ShallowWrapper = shallow(<Blog />);

  it('Should render PageContainer', () => {
    expect(wrapper.find(PageContainer)).toHaveLength(1);
  });

  it('Should render Card', () => {
    expect(wrapper.find(Card)).toHaveLength(BLOG_ITEMS_MOCK.length);
  });
});
