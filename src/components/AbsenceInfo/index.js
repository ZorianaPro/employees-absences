import React from 'react';
import './AbsenceInfo.css';

const AbsenceInfo = ({
  type,
  startDate,
  endDate,
  view
}) => (
  <li className="Absence-Info">
    <p>is { type === 'sickness' ? 'sick' : 'on vacation' }</p>
    <span className="Absence-Info-Date">
      { view === 'day'
        ? 'today'
        : `from ${startDate} to ${endDate}` }
    </span>
  </li>
);

export default AbsenceInfo;