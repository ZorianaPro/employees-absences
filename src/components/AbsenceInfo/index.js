import React from 'react';
import './AbsenceInfo.css';
import moment from 'moment';

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
        : ` from ${moment(startDate).format('DD-MM-YYY')} to ${moment(endDate).format('DD-MM-YYYY')}` }</p>
  </li>
);

export default AbsenceInfo;