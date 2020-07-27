import React from 'react';
import { navigate } from 'gatsby';
import confirmStyles from '../../styles/confirm.module.scss';
import Confirm from '../lottie/confirm';

const Completed = () => {
  return (
    <div className={`sign-up-form ${confirmStyles.signUp}`}>
      <div className="title" style={{ textAlign: 'center' }}>You&#39;re all set!</div>

      <Confirm />

      <button type="button" className={`submit ${confirmStyles.fadeIn}`} onClick={() => { navigate('/dashboard'); }}>Go to Dashboard</button>
    </div>
  );
};
export default Completed;
