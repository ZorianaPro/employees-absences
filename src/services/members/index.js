import members from '../../support/members';

export const list = () =>
  members.payload;

export const get = (id) =>
  list().find((member) => member.userId === id)
  || null;

export default {
  get,
  list
};
