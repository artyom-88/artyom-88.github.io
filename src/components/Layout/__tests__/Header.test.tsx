import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { NavigationMenu } from 'src/components/Navigation';
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

  it('Should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
