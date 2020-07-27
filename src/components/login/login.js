/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { BusinessHeader } from '../business';
import loginStyles from '../../styles/login.module.scss';
import LoginForm from './login-form';
import validateEmail from '../../utils/validateEmail';
import useAuth from '../../utils/useAuth';
import ForgotPassword from './forgot-password';
import SEO from '../seo';
import LoginFormBox from './login-form-box';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState('login');
  const [pageLoaded, setPageLoaded] = useState(false);

  const { auth } = useAuth();

  const handleChange = (val, id) => {
    switch (id) {
    case 'email':
      setEmail(val);
      break;
    case 'password':
      setPassword(val);
      break;
    default:
      break;
    }
    setError('');
  };

  const validateInput = () => {
    if (email.length === 0 || password.length === 0) {
      setError('Email and password are required.');
      return true;
    }
    if (!validateEmail(email)) {
      setError('Not a valid email address.');
      return true;
    }
    return false;
  };

  const handleFirebaseError = (firebaseError) => {
    console.log(firebaseError);
    switch (firebaseError.code) {
    case 'auth/invalid-email':
      setError('Not a valid email address.');
      break;
    case 'auth/user-disabled':
      setError('Invalid user.');
      break;
    case 'auth/user-not-found':
      setError('Email or password is incorrect.');
      break;
    case 'auth/wrong-password':
      setError('Email or password is incorrect.');
      break;
    case 'auth/too-many-requests':
      setError('Too many login attempts. Try again later.');
      break;
    default:
      setError('There was an error logging in. Please try again.');
      break;
    }
  };

  const submit = () => {
    if (!validateInput()) {
      setLoading(true);

      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          navigate('/dashboard');
        })
        .catch((firebaseError) => {
          handleFirebaseError(firebaseError);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const goToForgot = () => {
    setPageLoaded(true);
    setDisplay('forgot');
  };

  const goToLogin = () => {
    setPageLoaded(true);
    setDisplay('login');
  };

  return (
    <>
      <SEO title="Login" />
      <BusinessHeader pink backgroundClass={loginStyles.background} />
      <div className={`full-background ${loginStyles.background}`}>

        <LoginFormBox title={display === 'login' ? 'Business Login' : 'Forgot Password'} error={error} loading={loading}>
          <div>
            <LoginForm onChange={handleChange} submit={submit} forgot={goToForgot} disappear={display !== 'login'} pageLoaded={pageLoaded} />
            <ForgotPassword login={goToLogin} disappear={display !== 'forgot'} setError={setError} />
          </div>
        </LoginFormBox>

      </div>
    </>
  );
};

export default Login;
