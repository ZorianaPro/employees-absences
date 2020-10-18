import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Overlay from './';

describe('Overlay', () => {
  let overlay;

  it('renders without crashing', () => {
    expect(shallow.bind(shallow, <Overlay />))
      .not
      .toThrow();
  });

  it('renders as expected', () => {
    expect(shallow(<Overlay />))
      .toMatchSnapshot();
  });

  describe('children', () => {
    it('renders all the children', () => {
      expect(
        shallow(
          <Overlay>
            <p>test</p>
          </Overlay>
        ).exists('p')
      ).toBe(true);
    });
  });

  describe('onClose', () => {
    const onClose = jest.fn();
    beforeEach(() => {
      overlay = mount(
        <Overlay
          onClose={ onClose }
        />);
      act(() => {
        overlay
          .find('.Overlay-Close')
          .simulate('click');
      });
    });

    it('calls onClose callback', () => {
      expect(onClose)
        .toHaveBeenCalledTimes(1);
    });
  });
});