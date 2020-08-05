/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import PageLoader from '@components/page-loader';

const PrivateRoute = ({
  component: Component, location, user, ...rest
}) => {
  if (!user && location.pathname !== '/dashboard/login' && typeof window !== 'undefined' && !localStorage.getItem('expectSignIn')) {
    navigate('/dashboard/login');
    return null;
  }

  if (typeof window === 'undefined') { // SSR
    return null;
  }

  const checkAdmin = async () => {
    const { claims } = await user.getIdTokenResult();
    if (claims.admin) navigate('/admin');
  };

  useEffect(() => {
    if (user) {
      checkAdmin();
    }
  }, [user]);

  return user
    ? <Component {...rest} />
    : <PageLoader />;
};
export default PrivateRoute;
