/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { navigate } from 'gatsby';
import Loader from 'react-loader-spinner';

const PrivateRoute = ({
  component: Component, location, user, ...rest
}) => {
  if (!user && location.pathname !== '/dashboard/login' && typeof window !== 'undefined' && !localStorage.getItem('expectSignIn')) {
    navigate('/dashboard/login');
    return null;
  }
  return user
    ? <Component {...rest} />
    : (
      <div style={{
        width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyCosntent: 'center',
      }}
      >
        <Loader type="Oval" color="#FFB7B2" height={150} style={{ margin: 'auto auto' }} />
      </div>
    );
};
export default PrivateRoute;
