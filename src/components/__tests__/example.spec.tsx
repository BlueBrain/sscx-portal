import React from 'react';
import { shallow } from 'enzyme';
import Filter from '../example';

describe('', () => {
  it('filter renders correctly', () => {
    const result = shallow(<Filter />);
    expect(result).toMatchSnapshot();
  });
});
