import React, { useState, useEffect } from 'react';
import { getStateValueFromCode } from '@components/state-selector';
import useAuth from '@utils/useAuth';
import useStripeFunctions from '@utils/useStripeFunctions';
import DashboardScreen from '../dashboard-screen';
import CreditCardDisplay from './credit-card-display';
import EditModal from './edit-modal';

const PaymentScreen = ({ paymentInfo, businessAddress }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState({ value: 'CA', label: 'California' });
  const [useBusinessAddress, setUseBusinessAddress] = useState(true);
  const [isEditModalShown, setisEditModalShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { user } = useAuth();
  const { add, detach, getClientSecret } = useStripeFunctions();

  const update = async () => {
    setLoading(true);
    setError(false);
    try {
      const clientSecret = await getClientSecret();
      await add(clientSecret, address, city, stateCode.value);
      await detach(user.uid, paymentInfo.paymentMethodId);
    } catch (e) {
      console.log(e);
      setError(true);
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

  return (
    <>
      <DashboardScreen
        title="Payment"
        description="Manage your payment info"
        leftCol={<CreditCardDisplay paymentInfo={paymentInfo} openEdit={() => { setisEditModalShown(true); }} />}
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
        close={() => { setisEditModalShown(false); }}
        error={error}
        loading={loading}
        updatePaymentInfo={update}
      />
    </>
  );
};

export default PaymentScreen;
