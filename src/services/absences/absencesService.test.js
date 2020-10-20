import absencesService from './';
import absences from '../../support/absences';

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
      'startDate': '2017-01-13',
      'endDate': '2017-01-14',
      'userId': 12
    }, {
      'id': 2,
      'startDate': '2017-01-11',
      'endDate':'2017-01-14',
      'userId': 13
    }, {
      'id': 3,
      'startDate': '2014-01-13',
      'endDate': '2018-01-13',
      'userId': 14
    }
  ];

  describe('getByDate()', () => {
    let absences;
    describe('give date in between', () => {
      const date = '2015-01-14';
      beforeEach(() => {
        absences = absencesService.getByDate(list, date);
      });

      it('returns absences', () => {
        expect(absences[0])
          .toEqual(expect.objectContaining({
            'id': 3
          }));
      });
    });
    describe('give date the same as start date', () => {
      const date = '2017-01-13';
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
      const date = '2017-01-13';
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
      const date = '2034-12-13';
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