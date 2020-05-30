import AppBar from '@material-ui/core/AppBar';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { NavigationMenu } from 'src/components/Navigation';
import Header from '../Header';

describe('Header', () => {
  const wrapper: ShallowWrapper = shallow(<Header />);

  it('should render AppBar', () => {
    const appBar = wrapper.find(AppBar);
    expect(appBar).toHaveLength(1);
  });

  it('should render NavigationMenu', () => {
    const menu = wrapper.find(NavigationMenu);
    expect(menu).toHaveLength(1);
  });
});
