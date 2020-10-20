import absences from '../../support/absences';
import membersService from '../members';
import moment from 'moment';

export const list = () =>
  absences.payload;

export const listWithMoment = () =>
  list().map((absence) => {
    return {
      ...absence,
      startDate: moment(absence.startDate),
      endDate: moment(absence.endDate)
    };
  });

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
    moment(date).isBetween(moment(absence.startDate), moment(absence.endDate))
    || moment(date).unix() === moment(absence.startDate).unix()
    || moment(date).unix() === moment(absence.endDate).unix()
  ) || null;

export const getByYear = (list, date) =>
  list.filter((absence) =>
    moment(absence.startDate).year() === moment(date).year()
    || moment(absence.endDate).year() === moment(date).year()
  ) || null;

export const getByMonth = (list, date) =>
  list.filter((absence) =>
    (moment(absence.startDate).month() === moment(date).month()
      && moment(absence.startDate).year() === moment(date).year())
    || (moment(absence.endDate).month() === moment(date).month()
    && moment(absence.endDate).year() === moment(date).year())
  ) || null;

export const getByUser = (list, userId) =>
  list.filter((absence) =>
    absence.userId === userId
  ) || null;

export default {
  get,
  list,
  listWithMembers,
  listWithMoment,
  getByDate,
  getByYear,
  getByMonth,
  getByUser
};
