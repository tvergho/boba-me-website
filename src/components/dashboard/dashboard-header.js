import React from 'react';
import dashboardStyles from '../../styles/dashboard.module.scss';
import SignedIn from '../business/signed-in';
import useAuth from '../../utils/useAuth';

const DashboardHeader = () => {
  const { user } = useAuth();
  return (
    <div className={dashboardStyles.dashboardHeader}>
      <SignedIn user={user} />
    </div>
  );
};

export default DashboardHeader;
