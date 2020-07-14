import React, { useState, useEffect } from 'react';
import Ripples from 'react-ripples';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import businessStyles from '../../styles/business.module.scss';

const axios = require('axios');

const SignUpPage = ({ setRef }) => {
  const [delayedSubmit, setDelayedSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (submitted) {
      setTimeout(() => { setDelayedSubmit(true); }, 700);
    }
  }, [submitted]);

  const submit = () => {
    setSubmitted(true);
    const params = {
      method: 'POST',
      url: 'https://api.bobame.app/business/interest',
      data: {
        name,
        address,
        email,
        phone,
      },
    };
    axios(params);
  };

  const enabled = name.length > 0 && address.length > 0 && email.length > 0 && phone.length > 0;

  return (
    <div className={businessStyles.page} ref={setRef}>
      <div className={businessStyles.signUpFormBusiness}>
        <div>
          <div className={businessStyles.title}>Beta Sign-Up</div>
          <div className={businessStyles.subtitle}>We’ll contact you prior to the beta release of BobaMe, and there’s no commitment to join the platform.</div>
        </div>

        <form className={`${businessStyles.signUpForm} ${submitted ? 'rotate-out-2-cw' : ''}`} style={{ display: delayedSubmit ? 'none' : 'flex' }}>
          <input placeholder="Cafè Name" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value); }} />
          <input placeholder="Cafè Address" name="address" id="address" value={address} onChange={(e) => { setAddress(e.target.value); }} />
          <input placeholder="Email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
          <input placeholder="Phone" name="phone" id="phone" value={phone} onChange={(e) => { setPhone(e.target.value); }} />
          {enabled
            ? <Ripples during={1500}><button type="button" className={businessStyles.submit} onClick={submit} disabled={!enabled}>Join Our Platform</button></Ripples>
            : <button type="button" className={businessStyles.submit} onClick={submit} disabled={!enabled} style={{ marginTop: '30px' }}>Join Our Platform</button>}
        </form>

        <div className={businessStyles.submitted} style={{ display: delayedSubmit ? 'flex' : 'none' }}>
          <FontAwesomeIcon icon={faCheckCircle} size="3x" style={{ marginTop: '30px' }} />
          <div className={businessStyles.submittedText}>Your information has been submitted.</div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
