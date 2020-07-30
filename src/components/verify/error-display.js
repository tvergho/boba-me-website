import React from 'react';
import { Error } from '@components/lottie';

const ErrorDisplay = ({ message }) => {
  return (
    <div className="fade-in">
      <div className="title" style={{ textAlign: 'center' }}>{message}</div>
      <Error />
    </div>
  );
};

export default ErrorDisplay;
