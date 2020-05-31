import Card from '@material-ui/core/Card';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { BLOG_ITEMS_MOCK } from 'src/__mocks__';
import { Blog, PageContainer } from 'src/components/Pages';
import { useBlogItems } from 'src/components/Pages/Blog/hooks';

jest.mock('src/components/Pages/Blog/hooks');

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
