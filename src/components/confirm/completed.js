import React from 'react';
import Lottie from 'react-lottie';
import confirmStyles from '../../styles/confirm.module.scss';
import * as animationData from './confirm-popup.json';

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Completed = () => {
  return (
    <div className={`sign-up-form ${confirmStyles.signUp}`}>
      <div className="title" style={{ textAlign: 'center' }}>You&#39;re all set!</div>

      <Lottie options={defaultOptions}
        height="20vh"
        width="20vh"
        style={{ marginTop: '5vh' }}
      />

      <button type="button" className={`submit ${confirmStyles.fadeIn}`}>Go to Dashboard</button>
    </div>
  );
};
export default Completed;
