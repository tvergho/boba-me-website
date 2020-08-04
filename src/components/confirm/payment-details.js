/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { gql, useQuery } from '@apollo/client';
import useAuth from '@utils/useAuth';
import FormBox from './form-box';

const GET_BUSINESS_SECRET = gql`
query getBusiness ($businessId: ID!) {
  getBusiness(input: $businessId) {
    businessId
    client_secret
  }
}
`;

const PaymentDetails = ({ increment }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useAuth();
  const { data } = useQuery(GET_BUSINESS_SECRET, { variables: { businessId: user?.uid }, skip: !user });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const enabled = !!stripe && !!elements;

  const submit = async () => {
    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    const { error: stripeError, setupIntent } = await stripe.confirmCardSetup(data?.getBusiness?.client_secret, {
      payment_method: {
        card: cardElement,
      },
    });
    if (stripeError) {
      setError(stripeError?.message || 'There was an error with your card credentials. Please try again.');
      setLoading(false);
      console.log(stripeError);
    } else {
      setLoading(false);
      increment();
    }
  };

  return (
    <FormBox title="Payment Details" enabled={enabled} error={error} fullLoading={loading} submit={submit}>
      <h6>We will charge this payment method every month based upon the revenue you generate through BobaMe.</h6>

      <CardElement
        className="stripe-payment-input"
        options={{
          style: {
            base: {
              fontFamily: '\'Helvetica Neue\', \'Helvetica\', sans-serif',
              fontSize: '16px',
            },
          },
        }}
      />
    </FormBox>
  );
};

export default PaymentDetails;
