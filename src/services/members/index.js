import members from '../../support/members';

export const list = () => {
  return members.payload;
};

export const get = (id) =>
  list().find((member) => member.id === id)
  || null;

export default {
  get,
  list
};
