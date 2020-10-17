import React from 'react';
import Member from '../Member';
import './Absence.css';

const Absence = ({
  id,
  member,
  absence,
  view
}) => {
  const startDate = absence.startDate.format('DD/MM/YYYY');
  const endDate = absence.endDate.format('DD/MM/YYYY');
  return (
    <div className="Absence">
      <Member
        id={ id }
        userId={ member.userId }
        name={ member.name }
        image={ member.image }
      />
      <div className="Absence-Info">
        <p>is on {absence.type}</p>
        {
          view === 'day'
           && <p>today</p>
        }
        {
          view !== 'day'
          && <p> from {startDate} to {endDate} </p>
        }
      </div>
    </div>
  );
};

export default Absence;