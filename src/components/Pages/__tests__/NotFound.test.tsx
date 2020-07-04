import Typography from '@material-ui/core/Typography';
import { PageContainer } from 'components/Pages';
import NotFound from 'components/Pages/NotFound';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
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
