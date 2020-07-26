/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import ReactPasswordStrength from 'react-password-strength';
import FormBox from './form-box';
import useAuth from '../../utils/useAuth';

const ADD_BUSINESS = gql`
mutation create ($business: CreateBusinessInput!) {
    createBusiness(input: $business) {
      businessId
      email
    }
  }
`;

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validateInput = (email, password, confirmPassword, setError) => {
  let isError = false;

  if (password !== confirmPassword) {
    setError('Passwords do not match.');
    isError = true;
  }
  if (!validateEmail(email)) {
    setError('Email is invalid.');
    isError = true;
  }

  return isError;
};

const isSSR = typeof window === 'undefined';

const AccountDetails = ({ increment }) => {
  const [addBusiness, { error: isAddingError, data }] = useMutation(ADD_BUSINESS);
  const { auth, firebaseExport: firebase } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const enabled = email.trim().length > 0 && password.trim().length > 8 && confirmPassword.trim().length > 0 && isValidPassword;

  useEffect(() => {
    const storedEmail = localStorage.getItem('emailForConfirm');
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (data) {
      setLoading(false);
      increment();
    }
    if (isAddingError) {
      setError('There was an error creating your account. Please try again later.');
      setLoading(false);
    }
  }, [isAddingError, data]);

  const handleFirebaseError = (firebaseError) => {
    setLoading(false);
    console.log(firebaseError);

    switch (firebaseError.code) {
    case 'auth/email-already-in-use':
      setError('Email already in use.');
      break;
    case 'auth/argument-error':
      setError('Not a valid email link.');
      break;
    case 'auth/invalid-action-code':
      setError('Email link is invalid or expired.');
      break;
    default:
      setError('There was an error creating your account. Please try again later.');
      break;
    }
  };

  const submit = () => {
    if (!validateInput(email, password, confirmPassword, setError) && typeof window !== 'undefined' && auth) {
      setLoading(true);
      try {
        const credential = firebase.auth.EmailAuthProvider.credentialWithLink(email, window.location.href);

        auth.createUserWithEmailAndPassword(email, password)
          .then(() => {
            auth.currentUser.reauthenticateWithCredential(credential)
              .then(() => {
                const business = {
                  businessId: auth.currentUser.uid,
                  email,
                };
                console.log(business);

                addBusiness({ variables: { business } });
              });
          })
          .catch((firebaseError) => {
            handleFirebaseError(firebaseError);
          });
      } catch (e) {
        handleFirebaseError(e);
      }
    }
  };

  const handlePasswordChange = (state) => {
    setIsValidPassword(state.isValid);
    setPassword(state.password);
    setError('');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
    case 'email':
      setEmail(value);
      setError('');
      break;
    case 'confirm':
      setConfirmPassword(value);
      setError('');
      break;
    default:
      break;
    }
  };

  return (
    <FormBox title="Account Details" enabled={enabled} error={error} submit={submit} loading={loading}>
      <input placeholder="Email" name="email" id="email" value={email} onChange={handleChange} />
      {isSSR ? <></> : (
        <ReactPasswordStrength
          style={{ width: '100%', border: '0px', marginBottom: '15px' }}
          inputProps={{ placeholder: 'Password', name: 'password', style: { marginBottom: '0px' } }}
          changeCallback={handlePasswordChange}
          minLength={8}
          minScore={0}
        />
      )}
      <input placeholder="Confirm Password" type="password" name="confirm" id="confirm" value={confirmPassword} onChange={handleChange} />
    </FormBox>
  );
};

export default AccountDetails;
