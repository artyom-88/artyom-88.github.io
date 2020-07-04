import { LoadingIndicator } from 'components/Navigation';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

describe('LoadingIndicator', () => {
  const component = shallow(<LoadingIndicator />);

  it('Should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
