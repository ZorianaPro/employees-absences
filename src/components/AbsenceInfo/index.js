import React from 'react';
import './AbsenceInfo.css';

const AbsenceInfo = ({
  id,
  type,
  startDate,
  endDate,
  view
}) => (
  <li className="Absence-Info"
    key={ `absenceInfo-${id}` }>
    <p>is on { type }
      { view === 'day'
        ? ' today'
        : ` from ${startDate.format('DD/MM/YYYY')} to ${endDate.format('DD/MM/YYYY')}` }</p>
  </li>
);

export default AbsenceInfo;