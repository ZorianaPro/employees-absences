import React from 'react';
import { shallow } from 'enzyme';
import EmployeesAbsences from './';

describe('EmployeesAbsences', () => {
  it('renders without crashing', () => {
    expect(shallow.bind(shallow, <EmployeesAbsences/>)).not.toThrow();
  });

  it('renders as expected', () => {
    expect(shallow(<EmployeesAbsences/>)).toMatchSnapshot();
  });
});
