import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { BusinessHeader } from '@components/business';
import confirmStyles from '@styles/confirm.module.scss';
import {
  AccountDetails, BusinessDetails, PaymentDetails, Completed,
} from '@components/confirm';
import SEO from '@components/seo';
import useWindowSize from '@utils/useWindowSize';
import useAuth from '@utils/useAuth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51HAPDhLaYzzSqeWdaSFyCtN18guJc1SrtGISGh4OWbUEE8iBJMw9BS4rd2QHrHmJ1TMswNUGH7Z3HxBTKlIcXwC200ABHI5Xsu');

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
      <Elements stripe={stripePromise}>
        <SEO title="Confirm Sign Up" />
        <BusinessHeader hide={step <= 1} />
        <div className="full-background">
          <div className={confirmStyles.pageHeader}>{height < 600 ? 'Confirm Account' : 'Confirm Your Business Account'}</div>
          {step === 0 && <AccountDetails increment={increment} />}
          {step === 1 && <BusinessDetails increment={increment} />}
          {step === 2 && <PaymentDetails increment={increment} />}
          {step >= 3 && <Completed />}
        </div>
      </Elements>
    </>
  );
};

export default ConfirmSignUp;
