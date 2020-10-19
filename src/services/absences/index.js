import absences from '../../support/absences';
import membersService from '../members';

export const list = () =>
  absences.payload;

export const listWithMembers = (list) =>
  list.map((event) => {
    const members = membersService.list();
    const memberObject = members.filter((member) => member.userId === event.userId)
      || null;
    return {
      ...event,
      user: memberObject
    };
  });

export const get = (id) =>
  list().find((absence) => absence.id === id)
  || null;

export const getByDate = (list, date) =>
  list.filter((absence) =>
    new Date(date).getTime() >= new Date(absence.startDate).getTime()
    && new Date(date).getTime() <= new Date(absence.endDate).getTime()
  ) || null;

export const getByYear = (list, date) =>
  list.filter((absence) =>
    new Date(absence.startDate).getFullYear() === new Date(date).getFullYear()
    || new Date(absence.endDate).getFullYear() === new Date(date).getFullYear()
  ) || null;

export const getByMonth = (list, date) =>
  list.filter((absence) =>
    (new Date(absence.startDate).getMonth() === new Date(date).getMonth()
      && new Date(absence.startDate).getFullYear() === new Date(date).getFullYear())
    || (new Date(absence.endDate).getMonth() === new Date(date).getMonth()
    && new Date(absence.endDate).getFullYear() === new Date(date).getFullYear())
  ) || null;

export const getByUser = (list, userId) =>
  list.filter((absence) =>
    absence.userId === userId
  ) || null;

export default {
  get,
  list,
  listWithMembers,
  getByDate,
  getByYear,
  getByMonth,
  getByUser
};
