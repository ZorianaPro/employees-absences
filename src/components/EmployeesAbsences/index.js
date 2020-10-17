import React, { useEffect, useState, useCallback } from 'react';
import absencesService from '../../services/absences';
import membersService from '../../services/members';
import Timeline  from 'react-calendar-timeline';
import iCalendarService from '../../services/iCalendar';
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css';
import './EmployeesAbsences.css';

const EmployeesAbsences = () => {
  const [absences, setAbsences] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    try {
      const responceAbsences = absencesService.listWithMoment();
      const responceMembers = membersService.list();
      setAbsences(responceAbsences);
      setMembers(responceMembers);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClick = useCallback(async (event) => {
    try {
      const absencesToExport = await absencesService.listWithMembers(members);
      console.log(absencesToExport);
      iCalendarService.link({
        absences: absencesToExport,
        filename: 'download.ics'
      });
    } catch (error) {
      console.log(error);
    }
  }, [members]);

  return (
    <div className="EmployeesAbsences">
      <div onClick={ onClick }>
        Add to Calendar
      </div>
      <div className="Members-Table">
        <div>
          <Timeline
            groups={ members }
            items={ absences }
            defaultTimeStart={ moment([2017, 0, 1]) }
            defaultTimeEnd={ moment([2017, 0, 1]).add(1, 'year') }
            keys={{
              groupIdKey: 'userId',
              groupTitleKey: 'name',
              groupRightTitleKey: 'name',
              groupLabelKey: 'name',
              itemIdKey: 'id',
              itemTitleKey: 'type',
              itemDivTitleKey: 'type',
              itemGroupKey: 'userId',
              itemTimeStartKey: 'startDate',
              itemTimeEndKey: 'endDate'
            }}
            canMove={ false }
            canResize={ false }
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeesAbsences;