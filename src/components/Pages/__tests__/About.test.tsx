import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { bio } from 'src/assets';
import { About, PageContainer } from 'src/components/Pages';

describe('About page', () => {
  const wrapper: ShallowWrapper = shallow(<About />);

  it('Should render PageContainer', () => {
    expect(wrapper.find(PageContainer)).toHaveLength(1);
  });

  it('Should render Card', () => {
    const card = wrapper.find(Card);
    expect(card).toHaveLength(1);
  });

  it('Should render CardContent', () => {
    const content = wrapper.find(CardContent);
    expect(content).toHaveLength(1);
  });

  it('Should render Typography', () => {
    const typography = wrapper.find(Typography);
    expect(typography).toHaveLength(bio.data.length + 1);
  });
});
