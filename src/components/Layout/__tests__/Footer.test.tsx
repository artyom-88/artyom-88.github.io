import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { Footer } from 'src/components/Layout';
import { RIGHTS_TEXT } from 'src/components/Layout/Footer';

describe('Footer', () => {
  const wrapper: ShallowWrapper = shallow(<Footer />);

  it('should render Container', () => {
    const container = wrapper.find(Container);
    expect(container).toHaveLength(1);
    expect(container.prop('component')).toEqual('footer');
  });

  it('should render Typography', () => {
    const rights = wrapper.find(Typography);
    expect(rights).toHaveLength(1);
    expect(rights.prop('children')).toEqual(RIGHTS_TEXT);
  });

  it('should render links', () => {
    const links = wrapper.find('a');
    expect(links).toHaveLength(3);
  });

  it('should render FacebookIcon', () => {
    const icon = wrapper.find(FacebookIcon);
    expect(icon).toHaveLength(1);
  });

  it('should render GitHubIcon', () => {
    const icon = wrapper.find(GitHubIcon);
    expect(icon).toHaveLength(1);
  });

  it('should render LinkedInIcon', () => {
    const icon = wrapper.find(LinkedInIcon);
    expect(icon).toHaveLength(1);
  });

  it('should pass className', () => {
    const className = 'className';
    wrapper.setProps({ className });
    const container = wrapper.find(Container);
    expect(container.prop('className')).toEqual(className);
  });
});
