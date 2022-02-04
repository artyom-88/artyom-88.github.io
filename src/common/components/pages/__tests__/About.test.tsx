import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { bio } from 'assets';
import About from 'common/components/pages/About';
import PageContainer from 'common/components/pages/PageContainer';
import { shallow, ShallowWrapper } from 'enzyme';

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
