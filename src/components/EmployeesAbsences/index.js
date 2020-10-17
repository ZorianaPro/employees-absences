import React, { useEffect, useState, useCallback } from 'react';
import absencesService from '../../services/absences';
import membersService from '../../services/members';
import iCalendarService from '../../services/iCalendar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EmployeesAbsences.css';
import Absence from '../Absence';

const EmployeesAbsences = () => {
  const [absences, setAbsences] = useState([]);
  const [absencesToShow, setAbsencesToShow] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedView, setSelectedView] = useState('month');
  const [activeStartDate, setActiveStartDate] = useState(new Date(2017, 0, 1));

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

  useEffect(() => {
    let absencesToShow;
    if (selectedView === 'month') {
      absencesToShow = absencesService.getByMonth(absences, activeStartDate);
    } else if (selectedView === 'year') {
      absencesToShow = absencesService.getByYear(absences, activeStartDate);
    } else if (selectedView === 'day') {
      absencesToShow = absencesService.getByDate(absences, activeStartDate);
    } else {
      absencesToShow = absencesService.listWithMoment();
    }
    const absencesWithMembers = absencesService.listWithMembers(absencesToShow, members);
    setAbsencesToShow(absencesWithMembers);
  }, [absences, selectedView, activeStartDate, members]);

  const downloadICal = useCallback(async () => {
    const absencesToExport = await absencesService.listWithMembers(absences, members);
    iCalendarService.link({
      absences: absencesToExport,
      filename: 'download.ics'
    });
  }, [absences, members]);

  const onActiveStartDateChange = useCallback((value) => {
    setSelectedView(value.view);
    setActiveStartDate(value.activeStartDate);
  }, []);

  const onClickDay = useCallback((value) => {
    setSelectedView('day');
    setActiveStartDate(value);
  }, []);

  return (
    <div className="EmployeesAbsences">
      <div onClick={ downloadICal }>
        Download iCal file
      </div>
      <div className="EmployeesAbsences-Container">
        <Calendar
          onClickDay={ onClickDay }
          onActiveStartDateChange={ onActiveStartDateChange }
          defaultActiveStartDate={ new Date(2017, 0, 1) }
          showWeekNumbers
        />
        <div className="Absences">
          {
            absencesToShow.length > 0
              && absencesToShow.map((absence, key) =>
                <Absence
                  id={ key }
                  member={ absence.user[0] }
                  absence={ absence }
                  view={ selectedView }
                />
              )
          }
          {
            absencesToShow.length === 0
            && <p>No absences this {selectedView}</p>
          }

        </div>
      </div>
    </div>
  );
};

export default EmployeesAbsences;