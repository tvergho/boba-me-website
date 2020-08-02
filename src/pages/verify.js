import React, { useState, useEffect } from 'react';
import DefaultHeader from '@components/header';
import confirmStyles from '@styles/confirm.module.scss';
import { VerifyEmail, PasswordReset } from '@components/verify/';
import ConfirmSignUp from '@components/confirm/confirm';
import SEO from '../components/seo';

const VerifyPage = () => {
  const [mode, setMode] = useState('');
  const [actionCode, setActionCode] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setMode(urlParams.get('mode'));
    setActionCode(urlParams.get('oobCode'));
  }, []);

  if (mode === 'signIn') {
    return <ConfirmSignUp />;
  }

  return (
    <>
      <SEO title="Verify Your Account" />
      <DefaultHeader />
      <div className="full-background">
        <div className={`sign-up-form ${confirmStyles.signUp}`} style={{ marginTop: '0px' }}>
          {mode === 'verifyEmail' && <VerifyEmail actionCode={actionCode} />}
          {mode === 'resetPassword' && <PasswordReset actionCode={actionCode} />}
        </div>
      </div>
    </>
  );
};

export default VerifyPage;
