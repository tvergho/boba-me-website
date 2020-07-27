import React, { useState } from 'react';
import PageTransition from 'gatsby-plugin-page-transitions';
import { gql, useQuery, useMutation } from '@apollo/client';
import DashboardHeader from './dashboard-header';
import LeftSidebar from './left-sidebar';
import useAuth from '../../utils/useAuth';
import Backdrop from './backdrop';
import SEO from '../seo';
import ProfileScreen from './profile';

const SIDEBAR_ITEMS = ['Profile'];

const GET_BUSINESS = gql`
query getBusiness ($businessId: ID!) {
  getBusiness(input: $businessId) {
    businessId
    city
    name
    email
    phone_number
    photos
    state
    street_address
    website
    zip
  }
}
`;

const UPDATE_BUSINESS = gql`
mutation update ($business: UpdateBusinessInput!) {
    updateBusiness(input: $business) {
      businessId
      city
      name
      email
      phone_number
      photos
      state
      street_address
      website
      zip
    }
  }
`;

const Dashboard = () => {
  const [active, setActive] = useState('Profile');
  const { user } = useAuth();

  const { data } = useQuery(GET_BUSINESS, { variables: { businessId: user?.uid }, skip: !user });
  const [updateBusiness, { loading: isUpdatingBusiness, error: isUpdatingError }] = useMutation(UPDATE_BUSINESS);

  const save = (business) => {
    console.log(business);
    updateBusiness({ variables: { business } });
  };

  return (
    <PageTransition transitionTime={700}>
      <SEO title="Dashboard" />
      <DashboardHeader items={SIDEBAR_ITEMS} setActive={setActive} />
      <LeftSidebar active={active} setActive={setActive} items={SIDEBAR_ITEMS} data={data?.getBusiness} />

      {active === 'Profile' && <ProfileScreen data={data?.getBusiness} save={save} isSaving={isUpdatingBusiness} saveError={isUpdatingError} />}

      {(!user || !data) && <Backdrop />}
    </PageTransition>
  );
};

export default Dashboard;
