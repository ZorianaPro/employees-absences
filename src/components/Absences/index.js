import React, { useEffect, useState, useCallback } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import iCalendarService from '../../services/iCalendar';
import absencesService from '../../services/absences';
import membersService from '../../services/members';
import Calendar from 'react-calendar';
import SVGSpriteSheet from '../SVGSpriteSheet';
import Overlay from '../Overlay';
import Member from '../Member';
import AbsenceInfo from '../AbsenceInfo';
import 'react-calendar/dist/Calendar.css';
import './Absences.css';

const Absences = () => {
  const [absences, setAbsences] = useState([]);
  const [absencesToShow, setAbsencesToShow] = useState([]);
  const [selectedView, setSelectedView] = useState('day');
  const [activeStartDate, setActiveStartDate] = useState(new Date(2017, 1, 1, 0, 0));
  const [shouldOpenOverlay, setShouldOpenOverlay] = useState(false);
  const [activeMember, setActiveMember] = useState(null);
  const [activeMemberAbsences, setActiveMemberAbsences] = useState([]);
  const [shouldCleanURLParams, setShouldCleanURLParams] = useState(false);
  const location = useLocation();

  const resetState = useCallback(() => {
    setShouldOpenOverlay(false);
    setShouldCleanURLParams(true);
    setActiveMember(null);
  }, []);

  const downloadICal = useCallback(async () => {
    const absencesToExport = await absencesService.listWithMembers(absences);
    iCalendarService.link({
      absences: absencesToExport,
      filename: 'download.ics'
    });
  }, [absences]);

  const onActiveStartDateChange = useCallback((value) => {
    setSelectedView(value.view);
    setActiveStartDate(value.activeStartDate);
  }, []);

  const onClickDay = useCallback((value) => {
    setSelectedView('day');
    setActiveStartDate(value);
  }, []);

  const onOverlayClose = useCallback(() => {
    resetState();
  }, [resetState]);

  useEffect(() => {
    const responceAbsences = absencesService.list();
    setAbsences(responceAbsences);
  }, []);

  useEffect(() => {
    let absencesToShow;
    switch (selectedView) {
      case 'month':
        absencesToShow = absencesService.getByMonth(absences, activeStartDate);
        break;
      case 'year':
        absencesToShow = absencesService.getByYear(absences, activeStartDate);
        break;
      case 'day':
        absencesToShow = absencesService.getByDate(absences, activeStartDate);
        break;
      default:
        absencesToShow = absencesService.list();
    }
    const absencesWithMembers = absencesService.listWithMembers(absencesToShow);
    setAbsencesToShow(absencesWithMembers);
  }, [absences, selectedView, activeStartDate]);

  useEffect(() => {
    const searchArray = window.location.search.split('=');
    if (searchArray) {
      const userId = searchArray[1] * 1;
      const member = membersService.get(userId);
      if (member) {
        setActiveMember(member);
        setShouldOpenOverlay(true);
        setShouldCleanURLParams(false);
      } else {
        resetState();
      }
    }
  }, [location.search, resetState]);

  useEffect(() => {
    if (activeMember) {
      const memberAbsences = absencesService.getByUser(absences, activeMember.userId);
      setActiveMemberAbsences(memberAbsences);
    }
  }, [activeMember, absences]);

  return (
    <div className="Absences">
      <div onClick={ downloadICal }>
        Download iCal file
      </div>
      <div className="Absences-Container">
        <Calendar
          onClickDay={ onClickDay }
          onActiveStartDateChange={ onActiveStartDateChange }
          value={ new Date(2017, 1, 1, 0, 0) }
        />
        <div className="Absences-List">
          {
            absencesToShow.length > 0
              && absencesToShow.map((absence, key) =>
                <Link className="Absence"
                  key={ `absence-${absence.id}` }
                  to={{
                    pathname: '/',
                    search: `?userId=${absence.userId}`
                  }}
                >
                  <Member
                    id={ key }
                    userId={ absence.userId }
                    name={ absence.user[0].name }
                  />
                  <AbsenceInfo
                    key={ `absenceInfo-${key}` }
                    type={ absence.type }
                    startDate={ absence.startDate }
                    endDate={ absence.endDate }
                    view={ selectedView }
                  />
                </Link>
              )
          }
          {
            absencesToShow.length === 0
            && <p>No absences this {selectedView}</p>
          }
        </div>
      </div>
      {
        shouldOpenOverlay
        && <Overlay
          onClose={ onOverlayClose }
        >
          <Member
            id={ 0 }
            userId={ activeMember.userId }
            name={ activeMember.name }
          />
          <ul>
            {
              activeMemberAbsences.length > 0
              && activeMemberAbsences.map((absence, key) =>
                <AbsenceInfo
                  key={ `absenceInfo-${key}` }
                  type={ absence.type }
                  startDate={ absence.startDate }
                  endDate={ absence.endDate }
                  view={ 'month' }
                />
              )
            }
          </ul>
        </Overlay>
      }
      {
        shouldCleanURLParams
        && <Redirect to="/" />
      }
      <SVGSpriteSheet/>
    </div>
  );
};

export default Absences;