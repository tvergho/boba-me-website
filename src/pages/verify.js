/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import DefaultHeader from '@components/header';
import confirmStyles from '@styles/confirm.module.scss';
import { Confirm, Error } from '@components/lottie';
import useAuth from '@utils/useAuth';
import SEO from '../components/seo';

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
      <div className="fade-in">
        <div className="title" style={{ textAlign: 'center' }}>There was an error verifying your email.</div>
        <Error />
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="title" style={{ textAlign: 'center' }}>Your email is confirmed!</div>
      <Confirm />
    </div>
  );
};

const VerifyPage = () => {
  const [mode, setMode] = useState('');
  const [actionCode, setActionCode] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setMode(urlParams.get('mode'));
    setActionCode(urlParams.get('oobCode'));
  }, []);

  return (
    <>
      <SEO title="Verify Your Account" />
      <DefaultHeader />
      <div className="full-background">
        <div className={`sign-up-form ${confirmStyles.signUp}`}>
          {mode === 'verifyEmail' && <VerifyEmail actionCode={actionCode} />}
        </div>
      </div>
    </>
  );
};

export default VerifyPage;
