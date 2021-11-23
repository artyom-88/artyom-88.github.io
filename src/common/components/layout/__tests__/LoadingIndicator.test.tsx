import LoadingIndicator from 'common/components/layout/LoadingIndicator';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('LoadingIndicator', () => {
  const component = shallow(<LoadingIndicator />);

  it('Should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
