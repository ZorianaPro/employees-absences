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
});