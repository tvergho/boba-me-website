import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { BusinessHeader } from '@components/business';
import confirmStyles from '@styles/confirm.module.scss';
import { AccountDetails, BusinessDetails, Completed } from '@components/confirm';
import SEO from '@components/seo';
import useWindowSize from '@utils/useWindowSize';
import useAuth from '@utils/useAuth';

const ConfirmSignUp = () => {
  const { auth } = useAuth();
  const { height } = useWindowSize();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (auth && !auth.isSignInWithEmailLink(window.location.href)) {
      navigate('/business');
    }
  }, [auth]);

  const increment = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      <SEO title="Confirm Sign Up" />
      <BusinessHeader hide={step <= 1} />
      <div className="full-background">
        <div className={confirmStyles.pageHeader}>{height < 600 ? 'Confirm Account' : 'Confirm Your Business Account'}</div>
        {step === 0 && <AccountDetails increment={increment} />}
        {step === 1 && <BusinessDetails increment={increment} />}
        {step >= 2 && <Completed />}
      </div>
    </>
  );
};

export default ConfirmSignUp;
