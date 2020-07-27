import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './preloader.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loading = ({ width = '30vw', height = '40vh', style }) => {
  return (
    <Lottie options={defaultOptions}
      height={height}
      width={width}
      style={style}
    />
  );
};

export default Loading;
