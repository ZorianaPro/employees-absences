import React, { useEffect, useState } from 'react';
import absencesService from '../../services/absences';
import membersService from '../../services/members';
import Timeline  from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import './EmployeesAbsences.css';

const EmployeesAbsences = () => {
  const [absences, setAbsences] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    try {
      const responce = absencesService.listWithMoment();
      setAbsences(responce);
    } catch (e) {
      console.log(e);
    }
    try {
      const responce = membersService.list();
      setMembers(responce);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="EmployeesAbsences">
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
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeesAbsences;