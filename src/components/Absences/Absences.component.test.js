import React from 'react';
import Absences from './';
import { MemoryRouter as Router } from 'react-router-dom';
import membersService from '../../services/members';
import { shallow, mount } from 'enzyme';

describe('Absences', () => {
  let absencesComponent;
  beforeEach(() => {
    absencesComponent = shallow(
      <Router>
        <Absences/>
      </Router>
    );
  });

  it('renders without crashing', () => {
    expect(shallow.bind(
      shallow,
      <Router>
        <Absences />
      </Router>
    )).not.toThrow();
  });

  it('renders as expected', () => {
    expect(absencesComponent.find('.Absences'))
      .toMatchSnapshot();
  });

  describe('absencesToShow', () =>  {
    let absencesComponent;

    beforeEach(() => {
      absencesComponent = mount(
        <Router>
          <Absences/>
        </Router>
      );
    });

    it('renders Absences-List', () => {
      expect(absencesComponent.exists('.Absences-List'))
        .toBe(true);
    });
  });

  describe('url params', () =>  {
    describe('if there is valid user id in url', () =>  {
      let absencesComponent;
      let locationSpy;
      let member;
      beforeAll(() => {
        locationSpy = jest.spyOn(window, 'location', 'get')
          .mockReturnValue({
            search: '?userID=644'
          });
        member = membersService.get(644);
      });
      afterAll(() => {
        locationSpy.mockRestore();
      });
      beforeEach(() => {
        absencesComponent = mount(
          <Router>
            <Absences/>
          </Router>
        );
      });

      it('renders overlay', () => {
        expect(absencesComponent.exists('.Overlay'))
          .toBe(true);
      });

      it('renders correct user incide', () => {
        expect(absencesComponent.find('.Overlay .Member .Member-Name').text())
          .toEqual(member.name);
      });

      it('renders as expected', () => {
        expect(absencesComponent.find('.Absences'))
          .toMatchSnapshot();
      });
    });

    describe('if there is no valid user id in url', () =>  {
      let absencesComponent;
      let locationSpy;
      beforeAll(() => {
        locationSpy = jest.spyOn(window, 'location', 'get')
          .mockReturnValue({
            search: '?userID=5353535353535'
          });
      });
      afterAll(() => {
        locationSpy.mockRestore();
      });
      beforeEach(() => {
        absencesComponent = mount(
          <Router>
            <Absences/>
          </Router>
        );
      });

      it('doesn\'t render  overlay', () => {
        expect(absencesComponent.exists('.Overlay'))
          .toBe(false);
      });
    });
  });

  describe('on change start date', () =>  {
    let absencesComponent;

    beforeEach(() => {
      absencesComponent = mount(
        <Router>
          <Absences/>
        </Router>
      );
    });

    it('renders Absences-List', () => {
      expect(absencesComponent.exists('.Absences-List'))
        .toBe(true);
    });
  });
});