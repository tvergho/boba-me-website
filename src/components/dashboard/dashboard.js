import React, { useState } from 'react';
import PageTransition from 'gatsby-plugin-page-transitions';
import { gql, useQuery } from '@apollo/client';
import DashboardHeader from './dashboard-header';
import LeftSidebar from './left-sidebar';
import useAuth from '../../utils/useAuth';
import Backdrop from './backdrop';

const SIDEBAR_ITEMS = ['Profile'];

const GET_BUSINESS = gql`
query getBusiness ($businessId: ID!) {
  getBusiness(input: $businessId) {
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

  return (
    <PageTransition transitionTime={700}>
      <DashboardHeader items={SIDEBAR_ITEMS} setActive={setActive} />
      <LeftSidebar active={active} setActive={setActive} items={SIDEBAR_ITEMS} data={data?.getBusiness} />

      {(!user || !data) && <Backdrop />}
    </PageTransition>
  );
};

export default Dashboard;
