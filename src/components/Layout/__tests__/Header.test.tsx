import NavigationMenu from 'components/Navigation/NavigationMenu';
import { shallow, ShallowWrapper } from 'enzyme';
import Header from '../Header';

describe('Header', () => {
  const wrapper: ShallowWrapper = shallow(<Header />);

  it('should render header tag', () => {
    const header = wrapper.find('header');
    expect(header).toHaveLength(1);
  });

  it('should render NavigationMenu', () => {
    const menu = wrapper.find(NavigationMenu);
    expect(menu).toHaveLength(1);
  });

  it('should pass className', () => {
    const className = 'className';
    wrapper.setProps({ className });
    const header = wrapper.find('header');
    expect(header.prop('className')).toEqual(className);
  });
});
