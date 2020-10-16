import React, { useEffect, useState } from 'react';
import absencesService from '../../services/absences';
import './EmployeesAbsences.css';

const EmployeesAbsences = () => {
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    try {
      const responce = absencesService.list();
      setAbsences(responce);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className="EmployeesAbsences">
      {
        absences.map((absence) => (
          absence.id
        ))
      }
    </div>
  );
};

export default EmployeesAbsences;