import { PageContainer } from 'components/Pages';
import Main from 'components/Pages/Main';
import MainPageContent from 'components/Pages/MainPageContent';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

describe('Main page', () => {
  const wrapper: ShallowWrapper = shallow(<Main />);

  it('Should render PageContainer', () => {
    expect(wrapper.find(PageContainer)).toHaveLength(1);
  });

  it('Should render content', () => {
    const content = wrapper.find(MainPageContent);
    expect(content).toHaveLength(1);
  });
});
