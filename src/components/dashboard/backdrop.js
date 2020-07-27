import React from 'react';
import Loader from 'react-loader-spinner';

const Backdrop = () => {
  return (
    <div className="backdrop">
      <Loader type="Oval" color="rgba(0,0,0,0.7)" height={150} />
    </div>
  );
};

export default Backdrop;
