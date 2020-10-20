import React from 'react';
import './AbsenceInfo.css';

const AbsenceInfo = ({
  type,
  startDate,
  endDate,
  view,
  isLinesSeparated = false
}) => (
  <li className={ `Absence-Info ${isLinesSeparated ? 'Absence-Info--isLinesSeparated' : ''}` }>
    <span>is { type === 'sickness' ? 'sick' : 'on vacation' }</span>
    <span className="Absence-Info-Date">
      { view === 'day'
        ? 'today'
        : `from ${startDate} to ${endDate}` }
    </span>
  </li>
);

export default AbsenceInfo;