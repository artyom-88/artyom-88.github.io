import Container from '@material-ui/core/Container';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Footer } from 'src/components/Layout';

describe('Footer', () => {
  const wrapper: ShallowWrapper = shallow(<Footer />);

  it('should render Container', () => {
    const container = wrapper.find(Container);
    expect(container).toHaveLength(1);
    expect(container.prop('component')).toEqual('footer');
  });

  it('should pass className', () => {
    const className = 'className';
    wrapper.setProps({ className });
    const container = wrapper.find(Container);
    expect(container.prop('className')).toEqual(className);
  });

  it('Should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
