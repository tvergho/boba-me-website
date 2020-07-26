import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Input from 'react-phone-number-input/input';
import businessStyles from '../../styles/business.module.scss';

const axios = require('axios');

const SignUpPage = ({ setRef }) => {
  const [delayedSubmit, setDelayedSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  useEffect(() => {
    if (submitted) {
      setTimeout(() => { setDelayedSubmit(true); }, 700);
    }
  }, [submitted]);

  const submit = () => {
    setSubmitted(true);
    localStorage.setItem('emailForConfirm', email);
    const params = {
      method: 'POST',
      url: 'https://api.bobame.app/business/interest',
      data: {
        name,
        address,
        email,
        businessPhone,
        contactName,
        contactPhone,
      },
    };
    axios(params);
  };

  const enabled = name?.length > 0 && address?.length > 0 && email?.length > 0 && businessPhone?.length > 0 && contactName?.length > 0 && contactPhone?.length > 0;

  return (
    <div className={businessStyles.page} ref={setRef}>
      <div className={`sign-up-form ${businessStyles.businessSignUp}`}>
        <div>
          <div className="title">Beta Sign-Up</div>
          <div className="subtitle">We’ll contact you prior to the beta release of BobaMe, and there’s no commitment to join the platform.</div>
        </div>

        <form className={`${submitted ? 'rotate-out-2-cw' : ''}`} style={{ display: delayedSubmit ? 'none' : 'flex' }}>
          <input placeholder="Cafè Name" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value); }} />
          <input placeholder="Cafè Address" name="address" id="address" value={address} onChange={(e) => { setAddress(e.target.value); }} />
          <input placeholder="Email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
          <Input country="US" placeholder="Cafè Phone" value={businessPhone} onChange={(val) => { setBusinessPhone(val); }} />
          <input placeholder="Contact Name" name="contactName" id="contactName" value={contactName} onChange={(e) => { setContactName(e.target.value); }} />
          <Input country="US" placeholder="Contact Phone" value={contactPhone} onChange={(val) => { setContactPhone(val); }} />

          <button type="button" className="submit" onClick={submit} disabled={!enabled} style={{ marginTop: '30px' }}>Join Our Platform</button>
        </form>

        <div className="submitted" style={{ display: delayedSubmit ? 'flex' : 'none' }}>
          <FontAwesomeIcon icon={faCheckCircle} size="3x" style={{ marginTop: '30px' }} />
          <div className="submitted-text">Your information has been submitted.</div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
