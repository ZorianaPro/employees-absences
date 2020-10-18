import React from 'react';
import Member from './';
import { shallow, mount } from 'enzyme';
const data = {
  'id': 1,
  'userId': 664,
  'name': 'Zozo'
};

describe('Member', () => {
  it('renders without crashing', () => {
    expect(shallow.bind(
      shallow,
      <Member
        id={ data.id }
        userId={ data.userId }
        name={ data.name }
      />
    )).not.toThrow();
  });

  it('renders as expected', () => {
    expect(mount(
      <Member
        id={ data.id }
        userId={ data.userId }
        name={ data.name }
      />
    )).toMatchSnapshot();
  });

  describe('name', () =>  {
    let member;
    beforeEach(() => {
      member = mount(
        <Member
          id={ data.id }
          userId={ data.userId }
          name={ data.name }
        />
      );
    });

    it('renders name', () => {
      expect(member.find('div p').text())
        .toEqual('Zozo');
    });
    it('renders avatar with first name character', () => {
      expect(member.find('.Member-Avatar span').text())
        .toEqual('Z');
    });
  });
});