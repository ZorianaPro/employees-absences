import absences from '../../support/absences';
import membersService from '../members';
import moment from 'moment';

export const list = () =>
  absences.payload;

/* startDate and endDate have to be passed as moment objects,
   to display absences in a calendar view
*/
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
  listWithMoment().find((absence) => absence.id === id)
  || null;

export const getByDate = (list, date) =>
  list.filter((absence) =>
    moment(date).isBetween(absence.startDate, absence.endDate)
    || moment(date).unix() === absence.startDate.unix()
    || moment(date).unix() === absence.endDate.unix()
  ) || null;

export const getByYear = (list, date) =>
  list.filter((absence) =>
    absence.startDate.year() === moment(date).year()
    || absence.endDate.year() === moment(date).year()
  ) || null;

export const getByMonth = (list, date) =>
  list.filter((absence) =>
    (absence.startDate.month() === moment(date).month()
      && absence.startDate.year() === moment(date).year())
    || (absence.endDate.month() === moment(date).month()
      && absence.endDate.year() === moment(date).year())
  ) || null;

export const getByUser = (list, userId) =>
  list.filter((absence) =>
    absence.userId === userId
  ) || null;

export default {
  get,
  list,
  listWithMoment,
  listWithMembers,
  getByDate,
  getByYear,
  getByMonth,
  getByUser
};
