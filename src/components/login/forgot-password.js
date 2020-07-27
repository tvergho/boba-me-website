import React, { useState, useEffect } from 'react';
import LoginFormBox from './login-form-box';
import loginStyles from '../../styles/login.module.scss';
import Confirm from '../lottie/confirm';
import validateEmail from '../../utils/validateEmail';
import useAuth from '../../utils/useAuth';

const ForgotForm = ({
  submitted, email, setEmail,
}) => {
  return (
    <div style={{ marginBottom: '10vh' }} className={submitted ? 'fade-out' : ''}>
      <input placeholder="Enter your email..." value={email} onChange={(e) => { setEmail(e.target.value); }} />
    </div>
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

const ForgotPassword = ({ login }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [delayedSubmit, setDelayedSubmit] = useState(false);

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
      setTimeout(() => { setDelayedSubmit(true); }, 500);

      auth.sendPasswordResetEmail(email);
    }
  };

  return (
    <LoginFormBox title="Forgot Password" error={error}>
      {delayedSubmit ? <ForgotCompleted email={email} /> : <ForgotForm email={email} setEmail={setEmail} submitted={submitted} delayedSubmit={delayedSubmit} />}

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <button type="button"
          className={`submit ${submitted ? 'fade-out' : ''}`}
          onClick={onSubmit}
          style={delayedSubmit ? { display: 'none' } : {}}
          disabled={email?.length === 0}
        >Reset your password
        </button>
        <button type="button" className={`button-text ${loginStyles.forgot}`} onClick={login}>Back to Login</button>
      </div>
    </LoginFormBox>
  );
};

export default ForgotPassword;
