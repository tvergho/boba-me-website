import React, { useState, useEffect } from 'react';
import { getStateValueFromCode } from '@components/state-selector';
import { gql, useLazyQuery } from '@apollo/client';
import useAuth from '@utils/useAuth';
import useStripeFunctions from '@utils/useStripeFunctions';
import DashboardScreen from '../dashboard-screen';
import CreditCardDisplay from './credit-card-display';
import EditModal from './edit-modal';
import DeleteModal from './delete-modal';

const GET_PAYMENT_INFO = gql`
query getBusiness ($businessId: ID!) {
  getBusiness(input: $businessId) {
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

const PaymentScreen = ({ paymentInfo, businessAddress }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState({ value: 'CA', label: 'California' });
  const [useBusinessAddress, setUseBusinessAddress] = useState(true);
  const [isEditModalShown, setisEditModalShown] = useState(false);
  const [isDeleteModalShown, setisDeleteModalShown] = useState(false);
  const [isAddModalShown, setisAddModalShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const { add, detach, getClientSecret } = useStripeFunctions();
  const [getPaymentInfo, { data }] = useLazyQuery(GET_PAYMENT_INFO, { variables: { businessId: user?.uid }, fetchPolicy: 'network-only' });

  const update = async () => {
    setLoading(true);
    setError('');
    try {
      const clientSecret = await getClientSecret();
      await add(clientSecret, address, city, stateCode.value);
      await detach(user.uid, paymentInfo.paymentMethodId);
      setisEditModalShown(false);
    } catch (e) {
      console.log(e);
      setError(e.message || 'There was an error updating your payment info.');
    } finally {
      setLoading(false);
    }
  };

  const addCard = async () => {
    setLoading(true);
    setError('');
    try {
      const clientSecret = await getClientSecret();
      await add(clientSecret, address, city, stateCode.value);
      getPaymentInfo();
    } catch (e) {
      console.log(e);
      setError(e.message || 'There was an error adding your card.');
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async () => {
    setLoading(true);
    setError('');
    try {
      await detach(user.uid, paymentInfo.paymentMethodId);
      setisDeleteModalShown(false);
    } catch (e) {
      console.log(e);
      setError(e.message || 'There was an error deleting your card.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (businessAddress?.address) {
      setAddress(businessAddress.address);
      setCity(businessAddress.city);
      setStateCode(getStateValueFromCode(businessAddress.state));
    }
  }, [businessAddress]);

  useEffect(() => {
    if (data) setisAddModalShown(false);
  }, [data]);

  return (
    <>
      <DashboardScreen
        title="Payment"
        description="Manage your payment info"
        leftCol={(
          <CreditCardDisplay
            paymentInfo={paymentInfo}
            openEdit={() => { setisEditModalShown(true); }}
            openDelete={() => { setisDeleteModalShown(true); }}
            openAdd={() => { setisAddModalShown(true); }}
          />
        )}
        mainWidth={100}
      />
      <EditModal
        values={{
          address, city, stateCode, useBusinessAddress,
        }}
        setters={{
          setAddress, setCity, setStateCode, setUseBusinessAddress,
        }}
        modalShown={isEditModalShown}
        close={() => {
          setisEditModalShown(false);
          setError('');
        }}
        error={error}
        loading={loading}
        updatePaymentInfo={update}
      />
      <EditModal
        values={{
          address, city, stateCode, useBusinessAddress,
        }}
        setters={{
          setAddress, setCity, setStateCode, setUseBusinessAddress,
        }}
        modalShown={isAddModalShown}
        close={() => {
          setisAddModalShown(false);
          setError('');
        }}
        error={error}
        loading={loading}
        updatePaymentInfo={addCard}
      />
      <DeleteModal
        modalShown={isDeleteModalShown}
        close={() => {
          setisDeleteModalShown(false);
          setError('');
        }}
        error={error}
        loading={loading}
        deletePaymentInfo={deleteCard}
      />
    </>
  );
};

export default PaymentScreen;
