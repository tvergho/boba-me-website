import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './error.json';

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Error = ({ width, height }) => {
  return (
    <Lottie options={defaultOptions}
      height={height || '20vh'}
      width={width || '20vh'}
      style={{ marginTop: '5vh' }}
    />
  );
};

export default Error;
