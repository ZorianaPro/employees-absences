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
});