import React from 'react';
import Loader from 'react-loader-spinner';

const Backdrop = () => {
  return (
    <div className="backdrop">
      <Loader type="Oval" color="#FFB7B2" height={150} />
    </div>
  );
};

export default Backdrop;
