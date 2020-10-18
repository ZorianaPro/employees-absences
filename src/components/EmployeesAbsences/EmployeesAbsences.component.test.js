import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import EmployeesAbsences from './';

describe('EmployeesAbsences', () => {
  let employeesAbsences;
  beforeEach(() => {
    employeesAbsences = shallow(
      <Router>
        <EmployeesAbsences/>
      </Router>
    );
  });
  it('renders without crashing', () => {
    expect(shallow.bind(shallow,
      <Router>
        <EmployeesAbsences/>
      </Router>
    )).not.toThrow();
  });

  it('renders as expected', () => {
    expect(employeesAbsences.find('.EmployeesAbsences'))
      .toMatchSnapshot();
  });
});
