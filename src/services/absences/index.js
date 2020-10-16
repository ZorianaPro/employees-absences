import absences from '../../support/absences';
import moment from 'moment';

export const list = () =>
  absences.payload;

/* startDate and endDate have to be passed as moment objects,
   to display absences in a calendar view
   canMove: false => to not move this event in a calendar
*/
export const listWithMoment = () =>
  list().map((absence) => {
    return {
      ...absence,
      startDate: moment(absence.startDate),
      endDate: moment(absence.endDate).add(24, 'hour'),
      canMove: false
    };
  });

export const get = (id) =>
  listWithMoment().find((absence) => absence.id === id)
  || null;

export default {
  get,
  list,
  listWithMoment
};
