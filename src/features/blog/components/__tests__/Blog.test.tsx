import Card from '@material-ui/core/Card';
import { BLOG_ITEMS_MOCK } from '__mocks__/blog.mock';
import PageContainer from 'common/components/pages/PageContainer';
import useListItems from 'common/hooks/useListItems';
import { shallow, ShallowWrapper } from 'enzyme';
import Blog from 'features/blog/components/Blog';

jest.mock('common/hooks/useListItems');

describe('Blog page', () => {
  (useListItems as jest.Mock).mockReturnValue({ isLoading: false, items: BLOG_ITEMS_MOCK });

  const wrapper: ShallowWrapper = shallow(<Blog />);

  it('Should render PageContainer', () => {
    expect(wrapper.find(PageContainer)).toHaveLength(1);
  });

  it('Should render Card', () => {
    expect(wrapper.find(Card)).toHaveLength(BLOG_ITEMS_MOCK.length);
  });
});
