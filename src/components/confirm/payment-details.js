/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import useAuth from '@utils/useAuth';
import useStripeFunctions from '@utils/useStripeFunctions';
import { getStateValueFromCode } from '@components/state-selector';
import FormBox from './form-box';
import PaymentEntry from './payment-entry';

const GET_BUSINESS_ADDRESS = gql`
query getBusiness ($businessId: ID!) {
  getBusiness(input: $businessId) {
    businessId
    street_address
    city
    state
  }
}
`;

const PaymentDetails = ({ increment }) => {
  const { user } = useAuth();
  const { add, getClientSecret } = useStripeFunctions();
  const { data } = useQuery(GET_BUSINESS_ADDRESS, { variables: { businessId: user?.uid }, skip: !user });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useBusinessAddress, setUseBusinessAddress] = useState(true);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState({ value: 'CA', label: 'California' });

  const enabled = !!data;

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
    setError('');

    try {
      const clientSecret = await getClientSecret();
      await add(clientSecret, address, city, stateCode.value);
      setLoading(false);
      increment();
    } catch (e) {
      console.log(e);
      setError(e.message || 'There was an error with your card credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <FormBox title="Payment Details" enabled={enabled} error={error} fullLoading={loading} submit={submit}>
      <h6>We will charge this payment method every two weeks based upon the revenue you generate through BobaMe.</h6>

      <PaymentEntry
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
