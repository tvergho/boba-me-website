import React, { useState } from 'react';
import adminStyles from '@styles/admin.module.scss';
import PinkButton from '@components/pink-button';
import PropTypes from 'prop-types';
import Select from 'react-select';
import useAuth from '@utils/useAuth';
import axios from 'axios';

const getSelectValueFromBusiness = (business) => {
  const { businessName, email } = business;
  return {
    label: `${businessName} <${email}>`,
    value: email,
  };
};

const controlStyles = {
  marginBottom: '15px',
  borderRadius: '10px',
  fontWeight: 300,
  padding: '5px 10px',
  fontSize: '16px',
  color: 'rgba(0,0,0,0.9)',
};

const API_URL = 'https://api.bobame.app';

const SendEmailForm = ({ businesses }) => {
  const [selected, setSelected] = useState({});
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const submit = async () => {
    if (!selected.value) setMessageText('Must select a business.');
    else {
      setMessageText('');
      setLoading(true);
      const emails = [selected.value];
      const token = await user.getIdToken();
      const params = {
        method: 'POST',
        url: `${API_URL}/admin/business`,
        headers: {
          Authorization: token,
        },
        data: {
          emails,
        },
      };

      try {
        await axios(params);
        setMessageText('Email sent successfully.');
      } catch (e) {
        console.log(e);
        setMessageText('There was an error sending the email.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <h2 className={adminStyles.adminHeader}>Admin Panel</h2>
      <Select
        options={businesses.map((business) => getSelectValueFromBusiness(business))}
        styles={{
          container: (base) => ({
            ...base, width: '50vw',
          }),
          control: (base) => ({
            ...base, ...controlStyles,
          }),
          input: (base) => ({
            ...base, marginBottom: '0px',
          }),
        }}
        value={selected}
        onChange={(val) => { setSelected(val); }}
      />
      <PinkButton className={adminStyles.submit} onClick={() => { submit(); }} disabled={loading}>Send Email</PinkButton>
      <div>{messageText}</div>
    </>
  );
};

SendEmailForm.propTypes = {
  businesses: PropTypes.arrayOf(PropTypes.shape({
    businessName: PropTypes.string,
    email: PropTypes.string.isRequired,
  })).isRequired,
};

export default SendEmailForm;
