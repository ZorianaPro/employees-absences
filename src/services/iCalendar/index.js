/*
  This file takes care of generating .ical file for events
  see documentation here https://icalendar.org/RFC-Specifications/iCalendar-RFC-5545/
*/
export const pad = (num) =>
  (num < 10) ? `0${num}` : `${num}`;

export const formatDate = (dateString) => {
  const dateTime = new Date(dateString);
  return [
    dateTime.getUTCFullYear(),
    pad(dateTime.getUTCMonth() + 1),
    pad(dateTime.getUTCDate()),
    'T',
    pad(dateTime.getUTCHours()),
    `${pad(dateTime.getUTCMinutes())}00Z`
  ].join('');
};

export const createICalFileContent = (absences, useDataURL) => {
  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Eventful//Eventful 2.0//EN'
  ];
  absences.map((absence) =>
    calendar.push(
      'BEGIN:VEVENT',
      `UID:${absence.id}`,
      `DTSTAMP:${formatDate(absence.createdAt)}`,
      `URL:${document.URL}`,
      `DTSTART:${formatDate(absence.startDate)}`,
      `DTEND:${formatDate(absence.endDate)}`,
      `SUMMARY:${absence.user[0].name} is ${absence.type === 'vacation' ? 'on vacation' : 'sick'} today`,
      `DESCRIPTION:${absence.memberNote}`,
      `STATUS:${absence.confirmedAt ? 'CONFIRMED' : 'TENTATIVE'}`,
      'END:VEVENT'
    )
  );
  calendar.push(
    'END:VCALENDAR'
  );
  const sendData = calendar.join('\r\n');
  if (useDataURL) {
    return encodeURI(`data:text/calendar;charset=utf8,${sendData}`);
  } else {
    return sendData;
  }
};

export const downloadBlob = (blob, filename) => {
  const linkEl = document.createElement('a');
  linkEl.href = window.URL.createObjectURL(blob);
  linkEl.setAttribute('download', filename);
  document.body.appendChild(linkEl);
  linkEl.click();
  document.body.removeChild(linkEl);
};

const isIOSSafari = () => {
  const userAgent = window.navigator.userAgent;
  const iOS = !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i);
  const webkit = !!userAgent.match(/WebKit/i);
  return iOS && webkit && !userAgent.match(/CriOS/i);
};
//this works on Linux. Unfortunately couldn't test on different OS
export const link = ({ absences, filename }) => {
  const content = createICalFileContent(absences, isIOSSafari());
  const contentBlob = new Blob([content], {
    type: 'text/calendar;charset=utf-8'
  });
  downloadBlob(contentBlob, filename);
};

export default {
  pad,
  formatDate,
  createICalFileContent,
  link
};