import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { LoadingIndicator } from 'src/components/Navigation';

describe('LoadingIndicator', () => {
  const component = shallow(<LoadingIndicator />);

  it('Should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
