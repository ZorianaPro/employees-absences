import React from 'react';
import AbsenceInfo from './';
import { shallow, mount } from 'enzyme';

const data = {
  'id': 1,
  'type': 'vacation',
  'startDate': '2020-01-13',
  'endDate': '2020-02-13',
  'view': 'month'
};

describe('AbsenceInfo', () => {
  it('renders without crashing', () => {
    expect(shallow.bind(
      shallow,
      <AbsenceInfo
        id={ data.id }
        type={ data.type}
        startDate={ data.startDate}
        endDate={ data.endDate }
        view={ data.view }
      />
    )).not.toThrow();
  });

  it('renders as expected', () => {
    expect(mount(
      <AbsenceInfo
        id={ data.id }
        type={ data.type}
        startDate={ data.startDate}
        endDate={ data.endDate }
        view={ data.view }
      />
    )).toMatchSnapshot();
  });

  describe('view', () =>  {
    describe('is day', () =>  {
      let absenceInfo;
      beforeEach(() => {
        absenceInfo = mount(
          <AbsenceInfo
            id={ data.id }
            type={ data.type}
            startDate={ data.startDate}
            endDate={ data.endDate }
            view='day'
          />
        );
      });

      it('renders absence with today word', () => {
        expect(absenceInfo.find('.Absence-Info .Absence-Info-Date').text())
          .toEqual('today');
      });
    });

    describe('is month', () =>  {
      let absenceInfo;
      beforeEach(() => {
        absenceInfo = mount(
          <AbsenceInfo
            id={ data.id }
            type={ data.type}
            startDate={ data.startDate}
            endDate={ data.endDate }
            view='month'
          />
        );
      });

      it('renders absence with range', () => {
        expect(absenceInfo.find('.Absence-Info .Absence-Info-Date').text())
          .toEqual('from 2020-01-13 to 2020-02-13');
      });
    });
  });
});