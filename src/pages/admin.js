/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import useAuth from '@utils/useAuth';
import { navigate } from 'gatsby';
import PageLoader from '@components/page-loader';
import axios from 'axios';
import SEO from '@components/seo';
import adminStyles from '@styles/admin.module.scss';
import SendEmailForm from '@components/admin/send-email-form';
import PinkButton from '@components/pink-button';

const API_URL = 'https://api.bobame.app';

const Admin = () => {
  const { user, signOut } = useAuth();
  const [businesses, setBusinesses] = useState(null);

  useEffect(() => {
    if (user) {
      checkAdmin();
      loadBusinesses();
    }
  }, [user]);

  const checkAdmin = async () => {
    const { claims } = await user.getIdTokenResult();
    if (!claims.admin) navigate('/dashboard');
  };

  const loadBusinesses = async () => {
    const token = await user.getIdToken();
    const params = {
      method: 'GET',
      url: `${API_URL}/admin/business`,
      headers: {
        Authorization: token,
      },
    };
    const { data } = await axios(params);
    setBusinesses(data?.businesses);
  };

  if (typeof window === 'undefined') { // SSR
    return null;
  }

  if (!user && !localStorage.getItem('expectSignIn')) {
    navigate('/dashboard/login');
    return null;
  } else if ((!user && localStorage.getItem('expectSignIn')) || businesses == null) {
    return (
      <PageLoader />
    );
  }

  return (
    <>
      <SEO title="Admin Panel" />
      <PinkButton className={adminStyles.signOut} onClick={() => { signOut(); }}>Sign Out</PinkButton>

      <div className={adminStyles.adminContainer}>
        <SendEmailForm businesses={businesses} />
      </div>
    </>
  );
};

export default Admin;
