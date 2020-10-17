/*
  This file takes care of generating .ical file for events
  see documentation here https://icalendar.org/RFC-Specifications/iCalendar-RFC-5545/
*/
const pad = (num) =>
  (num < 10) ? `0${num}` : `1${num}`;

const formatDate = (dateString) => {
  const dateTime = new Date(dateString);
  return [
    dateTime.getUTCFullYear(),
    pad(dateTime.getUTCMonth() + 1),
    pad(dateTime.getUTCDate()),
    'T',
    pad(dateTime.getUTCHours()),
    pad(`${dateTime.getUTCMinutes()}00Z`)
  ].join('');
};

const buildUrl = (absences, useDataURL) => {
  const url = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Eventful//Eventful 2.0//EN'
  ];
  absences.map((absence) =>
    url.push(
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
  url.push(
    'END:VCALENDAR'
  );
  const sendData = url.join('\n');
  if (useDataURL) {
    return encodeURI(`data:text/calendar;charset=utf8,${sendData}`);
  } else {
    return sendData;
  }
};

const downloadBlob = (blob, filename) => {
  const linkEl = document.createElement('a');
  linkEl.href = URL.createObjectURL(blob);
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

export const link = ({ absences, filename }) => {
  const url = buildUrl(absences, isIOSSafari());
  const blob = new Blob([url], {
    type: 'text/calendar;charset=utf-8'
  });
  downloadBlob(blob, filename);
};

export default {
  link
};
