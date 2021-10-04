import Main from 'common/components/pages/Main';
import MainPageContent from 'common/components/pages/MainPageContent';
import PageContainer from 'common/components/pages/PageContainer';
import { shallow, ShallowWrapper } from 'enzyme';

describe('Main page', () => {
  const wrapper: ShallowWrapper = shallow(<Main />);

  it('Should render PageContainer', () => {
    expect(wrapper.find(PageContainer)).toHaveLength(1);
  });

  it('Should render content', () => {
    const content = wrapper.find(MainPageContent);
    expect(content).toHaveLength(1);
  });
});
