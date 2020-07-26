import React from 'react';
import { BusinessHeader } from '../business';
import loginStyles from '../../styles/login.module.scss';
import LoginForm from './login-form';

const Login = () => {
  return (
    <>
      <BusinessHeader pink />
      <div className={`full-background ${loginStyles.background}`}>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
