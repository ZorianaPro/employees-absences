import React from 'react';
import Absences from './';
import { MemoryRouter as Router } from 'react-router-dom';
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

  // describe('on click on absence', () =>  {
  //   let absencesComponent;
  //
  //   beforeEach(() => {
  //     absencesComponent = mount(
  //       <Router>
  //         <Absences/>
  //       </Router>
  //     );
  //     act(() => {
  //       absencesComponent
  //         .find('.Absence')
  //         .at(0)
  //         .simulate('click')
  //         .update();
  //     })
  //   });
  //
  //   it('renders overlay', () => {
  //     console.log(absencesComponent.find('.Absence a').first().debug())
  //     expect(absencesComponent.exists('.Overlay'))
  //       .toBe(true);
  //   });
  // });
});