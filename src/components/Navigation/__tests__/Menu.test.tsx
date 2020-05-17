import { shallow } from 'enzyme';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'src/components/Navigation';
import { PAGES } from 'src/const';

describe('Menu', () => {
  const component = shallow(<Menu />);

  it('Should render nav', () => {
    expect(component.find('nav')).toHaveLength(1);
  });

  it('Should render links', () => {
    expect(component.find(NavLink)).toHaveLength(PAGES.length);
  });
});
