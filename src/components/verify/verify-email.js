/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import useAuth from '@utils/useAuth';
import ResultDisplay from './result-display';
import ErrorDisplay from './error-display';

const VerifyEmail = ({ actionCode }) => {
  const { auth } = useAuth();
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (actionCode && auth) {
      verifyCode(actionCode);
    }
  }, [actionCode, auth]);

  const verifyCode = async (code) => {
    try {
      await auth.applyActionCode(code);
      setConfirmed(true);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  if (!confirmed && !error) return null;
  if (error) {
    return (
      <ErrorDisplay message="There was an error verifying your email." />
    );
  }

  return (
    <ResultDisplay message="Your email is confirmed!" />
  );
};

export default VerifyEmail;
