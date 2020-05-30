import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Footer } from 'src/components/Layout';

describe('Footer', () => {
  const wrapper: ShallowWrapper = shallow(<Footer />);

  it('should render footer tag', () => {
    const footer = wrapper.find('footer');
    expect(footer).toHaveLength(1);
  });

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
