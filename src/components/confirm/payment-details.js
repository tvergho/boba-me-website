/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { gql, useQuery } from '@apollo/client';
import useAuth from '@utils/useAuth';
import { getStateValueFromCode } from '@components/state-selector';
import FormBox from './form-box';
import AddressEntry from './address-entry';

const GET_BUSINESS_SECRET = gql`
query getBusiness ($businessId: ID!) {
  getBusiness(input: $businessId) {
    businessId
    street_address
    city
    state
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
  const [useBusinessAddress, setUseBusinessAddress] = useState(true);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState({ value: 'CA', label: 'California' });

  const enabled = !!stripe && !!elements && !!data;

  useEffect(() => {
    if (data?.getBusiness) {
      const {
        street_address, city: cityCache, state,
      } = data.getBusiness;
      setAddress(street_address);
      setCity(cityCache);
      setStateCode(getStateValueFromCode(state));
    }
  }, [data, useBusinessAddress]);

  const submit = async () => {
    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    const { error: stripeError, setupIntent } = await stripe.confirmCardSetup(data?.getBusiness?.client_secret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          address: {
            line1: address,
            city,
            state: stateCode.value,
          },
        },
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
      <h6>We will charge this payment method every two weeks based upon the revenue you generate through BobaMe.</h6>

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

      <AddressEntry
        values={{
          address, city, stateCode, useBusinessAddress,
        }}
        setters={{
          setAddress, setCity, setStateCode, setUseBusinessAddress,
        }}
      />
    </FormBox>
  );
};

export default PaymentDetails;
