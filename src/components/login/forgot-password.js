/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import loginStyles from '@styles/login.module.scss';
import validateEmail from '@utils/validateEmail';
import useAuth from '@utils/useAuth';
import { Slide } from 'react-awesome-reveal';
import useDelay from '@utils/useDelay';
import Confirm from '../lottie/confirm';

const ForgotForm = ({
  submitted, email, setEmail, disappear,
}) => {
  return (
    <Slide reverse={disappear}>
      <div style={{ marginBottom: '10vh' }} className={submitted ? 'fade-out' : ''}>
        <input placeholder="Enter your email..." value={email} onChange={(e) => { setEmail(e.target.value); }} />
      </div>
    </Slide>
  );
};

const ForgotCompleted = ({ email }) => {
  return (
    <div className="fade-in">
      <div className={loginStyles.subtitle}>{`A recovery link has been sent to ${email} if it is a valid email address.`}</div>
      <Confirm width="10vh" height="10vh" />
    </div>
  );
};

const ForgotPassword = ({ login, disappear, setError }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted, delayedSubmit, setDelayedSubmit] = useDelay(false);

  const { auth } = useAuth();

  useEffect(() => {
    setError('');
  }, [email]);

  const validateInput = () => {
    if (!validateEmail(email)) {
      setError('Invalid email.');
      return true;
    }
    return false;
  };

  const onSubmit = () => {
    if (!validateInput() && auth) {
      setSubmitted(true);
      auth.sendPasswordResetEmail(email);
    }
  };

  const backToLogin = () => {
    setEmail('');
    setSubmitted(false);
    setDelayedSubmit(false);
    login();
  };

  return (
    <div className="test" style={disappear ? { visibility: 'hidden', display: 'none' } : {}}>
      <Slide reverse={disappear} direction="left">

        {delayedSubmit
          ? <ForgotCompleted email={email} />
          : <ForgotForm email={email} setEmail={setEmail} submitted={submitted} disappear={disappear} />}

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <button type="button"
            className={`submit ${submitted ? 'fade-out' : ''}`}
            onClick={onSubmit}
            style={delayedSubmit ? { display: 'none' } : {}}
            disabled={email?.length === 0}
          >Reset your password
          </button>
          <button type="button" className={`button-text ${loginStyles.forgot}`} onClick={backToLogin}>Back to Login</button>
        </div>
      </Slide>
    </div>

  );
};

export default ForgotPassword;
