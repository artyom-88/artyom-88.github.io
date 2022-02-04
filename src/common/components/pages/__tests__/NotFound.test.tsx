import Typography from '@mui/material/Typography';
import NotFound from 'common/components/pages/NotFound';
import PageContainer from 'common/components/pages/PageContainer';
import { shallow, ShallowWrapper } from 'enzyme';
import { Link } from 'react-router-dom';

describe('NotFound', () => {
  const wrapper: ShallowWrapper = shallow(<NotFound />);

  it('Should render PageContainer', () => {
    expect(wrapper.find(PageContainer)).toHaveLength(1);
  });

  it('Should render Typography', () => {
    expect(wrapper.find(Typography)).toHaveLength(1);
  });

  it('Should render Link', () => {
    const link = wrapper.find(Link);
    expect(link).toHaveLength(1);
    expect(link.prop('to')).toEqual('/');
  });
});
