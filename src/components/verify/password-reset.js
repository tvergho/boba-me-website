/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import useAuth from '@utils/useAuth';
import ReactPasswordStrength from 'react-password-strength';
import PinkButton from '@components/pink-button';
import verifyStyles from '@styles/verify.module.scss';
import Loading from '@components/lottie/loading';
import ErrorDisplay from './error-display';
import ResultDisplay from './result-display';

const isSSR = typeof window === 'undefined';

const PasswordReset = ({ actionCode }) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const enabled = password?.length >= 8;

  useEffect(() => {
    if (actionCode && auth) {
      verifyCode(actionCode);
    }
  }, [actionCode, auth]);

  const verifyCode = async (code) => {
    try {
      const firebaseEmail = await auth.verifyPasswordResetCode(code);
      setEmail(firebaseEmail);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  const updatePassword = async () => {
    setLoading(true);
    try {
      await auth.confirmPasswordReset(actionCode, password);
      setLoading(false);
      setLoaded(true);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(true);
    }
  };

  if (!email && !error) return null;
  if (error) {
    return (
      <ErrorDisplay message="There was an error resetting your password." />
    );
  }
  if (!loaded) {
    return (
      <div className={`fade-in ${verifyStyles.container}`}>
        <div className="title" style={{ textAlign: 'center' }}>{`Enter a new password for ${email}.`}</div>
        {!isSSR && (
          <ReactPasswordStrength
            style={{
              width: '100%', border: '0px', marginTop: '15vh', marginBottom: '15px',
            }}
            inputProps={{ name: 'password', style: { marginBottom: '0px' } }}
            changeCallback={(state) => { setPassword(state.password); }}
            minLength={8}
            minScore={0}
          />
        )}
        <PinkButton disabled={!enabled} onClick={updatePassword}>Submit</PinkButton>

        {loading && (
          <div className="backdrop">
            <Loading style={{ marginTop: '5vh' }} />
          </div>
        )}
      </div>
    );
  }

  return (
    <ResultDisplay message="Your password was successfully reset." />
  );
};

export default PasswordReset;
