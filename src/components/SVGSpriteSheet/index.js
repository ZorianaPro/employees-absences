import React from 'react';
import XCloseSymbol from '../XCloseSymbol';
import './SVGSpriteSheet.css';

export const defaults = {
  className: 'SVGSpriteSheet',
  id: 'SVGSpriteSheet'
};

const SVGSpriteSheet = (props) => (
  <svg
    id={props.id || defaults.id}
    className={props.className || defaults.className}
  >
    <XCloseSymbol />
  </svg>
);

export default SVGSpriteSheet;
