import absences from '../../support/absences';

export const list = () => {
  return absences.payload;
};

export const get = (id) =>
  list().find((absence) => absence.id === id)
  || null;

export default {
  get,
  list
};
