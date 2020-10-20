import React from 'react';
import './AbsenceInfo.css';

const AbsenceInfo = ({
  type,
  startDate,
  endDate,
  view
}) => (
  <li className="Absence-Info">
    <p>is on { type }
      { view === 'day'
        ? ' today'
        : ` from ${startDate} to ${endDate}` }</p>
  </li>
);

export default AbsenceInfo;