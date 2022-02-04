import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Footer, { RIGHTS_TEXT } from 'common/components/layout/Footer';
import { shallow, ShallowWrapper } from 'enzyme';

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
