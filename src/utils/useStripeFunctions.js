/* eslint-disable no-unused-vars */
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  gql, useMutation,
} from '@apollo/client';
import axios from 'axios';
import useAuth from './useAuth';

const DETACH_PAYMENT_METHOD = gql`
mutation detach ($businessId: ID!, $paymentMethodId: String) {
    detachPaymentMethod(businessId: $businessId, paymentMethodId: $paymentMethodId) {
      businessId
      paymentInfo {
        stripeId
        paymentMethodId
        address {
          city
          state
          line1
          postal_code
        }
        card {
          brand
          last4
          exp_month
          exp_year
        }
      }
    }
  }
`;

const API_URL = 'https://api.bobame.app';

const useStripeFunctions = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [detachPaymentInfo] = useMutation(DETACH_PAYMENT_METHOD);

  const add = async (clientSecret, address, city, state) => {
    const cardElement = elements.getElement(CardElement);
    const { error: stripeError, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          address: {
            line1: address,
            city,
            state,
          },
        },
      },
    });
    if (stripeError) {
      throw new Error(stripeError?.message || 'There was an error with your card credentials. Please try again.');
    } else {
      return setupIntent;
    }
  };

  const detach = async (businessId, paymentMethodId) => {
    const result = await detachPaymentInfo({ variables: { businessId, paymentMethodId } });
    return result;
  };

  const getClientSecret = async () => {
    const token = await user.getIdToken();
    const params = {
      url: `${API_URL}/business/stripesecret`,
      method: 'get',
      headers: {
        Authorization: token,
      },
    };

    const result = await axios(params);
    return result.data.client_secret;
  };

  return { add, detach, getClientSecret };
};

export default useStripeFunctions;
