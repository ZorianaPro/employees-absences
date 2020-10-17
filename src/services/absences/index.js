import absences from '../../support/absences';
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
      endDate: moment(absence.endDate).add(24, 'hour')
    };
  });

export const listWithMembers = (members) =>
  listWithMoment().map((event) => {
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

export default {
  get,
  list,
  listWithMoment,
  listWithMembers
};
