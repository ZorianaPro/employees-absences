import React from 'react';
import './Member.css';

const colors = [
  '#6EA4BF',
  '#AA4465',
  '#FFF05A',
  '#FFCCC9',
  '#C1EEFF',
  '#81AE9D',
  '#63B0CD',
  '#90F1EF',
  '#B4D6D3',
  '#81B29A',
  '#6EA4BF',
  '#AA4465',
  '#FFF05A',
  '#FFCCC9',
  '#C1EEFF',
  '#81AE9D',
  '#63B0CD',
  '#90F1EF',
  '#B4D6D3',
  '#81B29A'
];

const Member = ({
  id,
  userId,
  name
}) => (
  <div className="Member"
    key={ `user-${userId}` }>
    <div className="Member-Avatar"
      style={{ backgroundColor: colors[id <= 20 ? id : Math.min(Math.ceil(id / 2), 20) ] }}>
      <span>{ name[0] }</span>
    </div>
    <p className="Member-Name">{ name }</p>
  </div>
);

export default Member;