import React from 'react';
import { Confirm } from '@components/lottie';

const ResultDisplay = ({ message }) => {
  return (
    <div className="fade-in">
      <div className="title" style={{ textAlign: 'center' }}>{message}</div>
      <Confirm />
    </div>
  );
};

export default ResultDisplay;
