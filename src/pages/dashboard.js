import React from 'react';
import { Router } from '@reach/router';
import { Login } from '../components/login';
import { Dashboard } from '../components/dashboard';
import PrivateRoute from '../components/private-route';
import useAuth from '../utils/useAuth';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <Router basepath="/dashboard">
      <PrivateRoute path="/" component={Dashboard} user={user} />
      <Login path="/login/" />
    </Router>
  );
};

export default DashboardPage;
