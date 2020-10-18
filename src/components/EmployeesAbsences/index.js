import React from 'react';
import { Switch, BrowserRouter as Route } from 'react-router-dom';
import Absences from '../Absences';
import './EmployeesAbsences.css';

const EmployeesAbsences = () =>  (
  <div className="EmployeesAbsences">
    <Switch>
      <Route path="/">
        <Absences/>
      </Route>
    </Switch>
  </div>
);

export default EmployeesAbsences;