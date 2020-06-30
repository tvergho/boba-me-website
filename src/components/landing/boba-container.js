import React from 'react';
import windowSize from 'react-window-size';
import Cup from './cup';

const BobaContainer = ({ windowWidth }) => {
  return (
    <div className="container-half">
      <Cup height={windowWidth > 960 ? 750 : 600} shrink={windowWidth <= 960} />
    </div>
  );
};

export default windowSize(BobaContainer);
