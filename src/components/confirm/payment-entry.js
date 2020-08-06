import React from 'react';
import PropTypes from 'prop-types';
import { CardElement } from '@stripe/react-stripe-js';
import AddressEntry from './address-entry';

const PaymentEntry = ({ values, setters }) => {
  return (
    <>
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
        values={values}
        setters={setters}
      />
    </>
  );
};

PaymentEntry.propTypes = {
  values: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    stateCode: PropTypes.object,
    useBusinessAddress: PropTypes.bool,
  }).isRequired,
  setters: PropTypes.shape({
    setAddress: PropTypes.func,
    setCity: PropTypes.func,
    setStateCode: PropTypes.func,
    setUseBusinessAddress: PropTypes.func,
  }).isRequired,
};

export default PaymentEntry;
