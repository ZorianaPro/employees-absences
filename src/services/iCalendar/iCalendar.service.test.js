import iCalendarService from './';
import moment from 'moment';

const absences = [
  {
    'confirmedAt': '2017-03-09T15:35:58.000+01:00',
    'createdAt': '2017-03-09T15:35:58.000+01:00',
    'crewId': 352,
    'endDate': '2017-03-18',
    'id': 3606,
    'memberNote': '',
    'rejectedAt': null,
    'startDate': '2017-03-16',
    'type': 'vacation',
    'userId': 644,
    'user': [
      {
        'crewId': 352,
        'id': 709,
        'image': 'http://place-hoff.com/300/400',
        'name': 'Max',
        'userId': 644
      }
    ]
  },
  {
    'confirmedAt': '2017-03-09T19:16:51.000+01:00',
    'createdAt': '2017-03-09T19:16:51.000+01:00',
    'endDate': '2017-03-13',
    'id': 3618,
    'memberNote': 'Test',
    'rejectedAt': null,
    'startDate': '2017-03-13',
    'type': 'vacation',
    'userId': 644,
    'user': [
      {
        'crewId': 352,
        'id': 709,
        'image': 'http://place-hoff.com/300/400',
        'name': 'Max',
        'userId': 644
      }
    ]
  }
];

const content = 'BEGIN:VCALENDAR\r\n'
  + 'VERSION:2.0\r\n'
  + 'PRODID:-//Eventful//Eventful 2.0//EN\r\n'
  + 'BEGIN:VEVENT\r\n'
  + 'UID:3606\r\n'
  + 'DTSTAMP:20170309T143500Z\r\n'
  + 'URL:http://localhost/\r\n'
  + 'DTSTART:20170316T000000Z\r\n'
  + 'DTEND:20170318T000000Z\r\n'
  + 'SUMMARY:Max is on vacation today\r\n'
  + 'DESCRIPTION:\r\n'
  + 'STATUS:CONFIRMED\r\n'
  + 'END:VEVENT\r\n'
  + 'BEGIN:VEVENT\r\n'
  + 'UID:3618\r\n'
  + 'DTSTAMP:20170309T181600Z\r\n'
  + 'URL:http://localhost/\r\n'
  + 'DTSTART:20170313T000000Z\r\n'
  + 'DTEND:20170313T000000Z\r\n'
  + 'SUMMARY:Max is on vacation today\r\n'
  + 'DESCRIPTION:Test\r\n'
  + 'STATUS:CONFIRMED\r\n'
  + 'END:VEVENT\r\n'
  + 'END:VCALENDAR';

describe('Icalendar service', () => {
  describe('pad()', () => {
    describe('pass value smaller then 10', () => {
      const num = 9;
      let pad;
      beforeEach(() => {
        pad = iCalendarService.pad(num);
      });

      it('returns 0 + num', () => {
        expect(pad)
          .toEqual('09');
      });
    });

    describe('pass value greater then 10', () => {
      const num = 69;
      let pad;
      beforeEach(() => {
        pad = iCalendarService.pad(num);
      });

      it('returns num', () => {
        expect(pad)
          .toEqual('69');
      });
    });
  });

  describe('formatDate()', () => {
    const date =  moment('2017-01-13');
    let formatDate;

    beforeEach(() => {
      formatDate = iCalendarService.formatDate(date);
    });

    it('returns formatted date', () => {
      expect(formatDate)
        .toEqual('20170112T230000Z');
    });
  });

  describe('createICalFileContent()', () => {
    const useDataURL =  false;
    let createICalFileContent;

    beforeEach(() => {
      createICalFileContent = iCalendarService.createICalFileContent(absences, useDataURL);
    });

    it('returns content for iCalendar file', () => {
      expect(createICalFileContent)
        .toEqual(content.toString());
    });
  });
});