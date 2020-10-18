import absencesService from './';
import absences from '../../support/absences';
import moment from 'moment';

describe('absences service', () => {
  describe('list()', () => {
    let absencesList;
    beforeEach(() => {
      absencesList = absencesService.list();
    });

    it('returns list of absences', () => {
      expect(absencesList)
        .toEqual(absences.payload);
    });
  });

  describe('listWithMoment()', () => {
    let absencesListWithMoment;
    let startDate;
    let endDate;
    beforeEach(() => {
      absencesListWithMoment = absencesService.listWithMoment();
      startDate = moment('2017-01-13');
      endDate = moment('2017-01-13');
    });

    it('returns list of absences with startDate as moments', () => {
      expect(absencesListWithMoment[0].startDate)
        .toStrictEqual(startDate);
    });

    it('returns list of absences with endDate  as moments', () => {
      expect(absencesListWithMoment[0].endDate)
        .toStrictEqual(endDate);
    });
  });

  describe('get()', () => {
    describe('passed existing id', () => {
      let absence;
      const id = 2351;
      beforeEach(() => {
        absence = absencesService.get(id);
      });

      it('returns absence', () => {
        expect(absence)
          .toEqual(expect.objectContaining({
            'id': 2351
          }));
      });
    });

    describe('passed non existing id', () => {
      let absence;
      const id = 13;
      beforeEach(() => {
        absence = absencesService.get(id);
      });

      it('returns absence', () => {
        expect(absence)
          .toEqual(null);
      });
    });
  });

  const list = [
    {
      'id': 1,
      'startDate': moment('2017-01-13').add(-12, 'h'),
      'endDate': moment('2017-01-13').add(12, 'h'),
      'userId': 12
    }, {
      'id': 2,
      'startDate': moment('2017-01-13').add(-2, 'd'),
      'endDate': moment('2017-01-13').add(1, 'd'),
      'userId': 13
    }, {
      'id': 3,
      'startDate': moment('2017-01-13').add(-2, 'y'),
      'endDate': moment('2017-01-13').add(1, 'y'),
      'userId': 14
    }
  ];

  describe('getByDate()', () => {
    let absences;
    describe('give date in between', () => {
      const date = moment('2017-01-13').add(-18, 'h');
      beforeEach(() => {
        absences = absencesService.getByDate(list, date);
      });

      it('returns absences', () => {
        expect(absences[0])
          .toEqual(expect.objectContaining({
            'id': 2
          }));
      });
    });
    describe('give date the same as start date', () => {
      const date = moment('2017-01-13').add(-12, 'h');
      beforeEach(() => {
        absences = absencesService.getByDate(list, date);
      });

      it('returns absences', () => {
        expect(absences[0])
          .toEqual(expect.objectContaining({
            'id': 1
          }));
      });
    });

    describe('give date the same as end date', () => {
      const date = moment('2017-01-13').add(12, 'h');
      beforeEach(() => {
        absences = absencesService.getByDate(list, date);
      });

      it('returns absences', () => {
        expect(absences[0])
          .toEqual(expect.objectContaining({
            'id': 1
          }));
      });
    });

    describe('give date not in range', () => {
      const date = moment('2034-12-13');
      beforeEach(() => {
        absences = absencesService.getByDate(list, date);
      });

      it('returns absences', () => {
        expect(absences)
          .toEqual([]);
      });
    });
  });

  describe('getByYear()', () => {
    let absences;
    describe('give date the same as start date year', () => {
      const date = '2017-10-02';
      beforeEach(() => {
        absences = absencesService.getByYear(list, date);
      });

      it('returns absences', () => {
        expect(absences.length)
          .toEqual(2);
      });
    });
    describe('give date the same as end date year', () => {
      const date = '2018-10-02';
      beforeEach(() => {
        absences = absencesService.getByYear(list, date);
      });

      it('returns absences', () => {
        expect(absences[0])
          .toEqual(expect.objectContaining({
            'id': 3
          }));
      });
    });

    describe('give date not in range', () => {
      const date = '2056-10-02';
      beforeEach(() => {
        absences = absencesService.getByYear(list, date);
      });

      it('returns absences', () => {
        expect(absences)
          .toEqual([]);
      });
    });
  });

  describe('getByMonth()', () => {
    let absences;
    describe('give date the same as start date month', () => {
      const date = '2017-01-02';
      beforeEach(() => {
        absences = absencesService.getByYear(list, date);
      });

      it('returns absences', () => {
        expect(absences.length)
          .toEqual(2);
      });
    });
    describe('give date the same as end date month', () => {
      const date = '2018-10-02';
      beforeEach(() => {
        absences = absencesService.getByYear(list, date);
      });

      it('returns absences', () => {
        expect(absences[0])
          .toEqual(expect.objectContaining({
            'id': 3
          }));
      });
    });
    describe('give date the same as end date month but different year', () => {
      const date = '2027-10-02';
      beforeEach(() => {
        absences = absencesService.getByYear(list, date);
      });

      it('returns absences', () => {
        expect(absences)
          .toEqual([]);
      });
    });
  });

  describe('getByUser()', () => {
    let absences;
    describe('give existing userId', () => {
      const userId = 13;
      beforeEach(() => {
        absences = absencesService.getByUser(list, userId);
      });

      it('returns absences', () => {
        expect(absences[0])
          .toEqual(expect.objectContaining({
            'id': 2
          }));
      });
    });
    describe('give not existing userId', () => {
      const userId = 69;
      beforeEach(() => {
        absences = absencesService.getByUser(list, userId);
      });

      it('returns absences', () => {
        expect(absences)
          .toEqual([]);
      });
    });
  });
});