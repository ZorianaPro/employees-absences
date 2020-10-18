import membersService from './';
import members from '../../support/members';

describe('members service', () => {
  describe('list()', () => {
    let membersList;
    beforeEach(() => {
      membersList = membersService.list();
    });
    it('returns list of members', () => {
      expect(membersList)
        .toEqual(members.payload);
    });
  });

  describe('get()', () => {
    describe('passed existing id', () => {
      let member;
      const id = 649;
      beforeEach(() => {
        member = membersService.get(id);
      });
      it('returns member', () => {
        expect(member)
          .toEqual(expect.objectContaining({
            'userId': id
          }));
      });
    });

    describe('passed non existing id', () => {
      let member;
      const id = 13;
      beforeEach(() => {
        member = membersService.get(id);
      });

      it('returns member', () => {
        expect(member)
          .toEqual(null);
      });
    });
  });
});
