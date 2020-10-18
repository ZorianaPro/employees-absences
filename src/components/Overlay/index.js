import React from 'react';
import XCloseSVG from '../XCloseSVG';
import './Overlay.css';

const Overlay = ({
  children,
  onClose
}) => (
  <div className="Overlay">
    <div className="Overlay-Mask"/>
    <div className="Overlay-Container">
      <div className="Overlay-Content">
        <div className="Overlay-Close"
          onClick={
            onClose
          }
        >
          <XCloseSVG/>
        </div>
        {
          children
        }
      </div>
    </div>
  </div>
);

export default Overlay;