import React from 'react';
import AbsenceInfo from './';
import { shallow, mount } from 'enzyme';
import moment from 'moment';

const data = {
  'id': 1,
  'type': 'vacation',
  'startDate': moment('2020-01-13'),
  'endDate': moment('2020-02-13'),
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
        expect(absenceInfo.find('.Absence-Info p').text())
          .toEqual('is on vacation today');
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
        expect(absenceInfo.find('.Absence-Info p').text())
          .toEqual('is on vacation from 13/01/2020 to 13/02/2020');
      });
    });
  });
});