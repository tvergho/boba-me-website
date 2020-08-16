import React, { useState } from 'react';
import PageTransition from 'gatsby-plugin-page-transitions';
import {
  gql, useQuery, useMutation,
} from '@apollo/client';
import dashboardStyles from '@styles/dashboard.module.scss';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DashboardHeader from './dashboard-header';
import LeftSidebar from './left-sidebar';
import useAuth from '../../utils/useAuth';
import Backdrop from './backdrop';
import SEO from '../seo';
import ProfileScreen from './profile';
import PaymentScreen from './payment';

const stripePromise = loadStripe('pk_live_51HAPDhLaYzzSqeWdaSFyCtN18guJc1SrtGISGh4OWbUEE8iBJMw9BS4rd2QHrHmJ1TMswNUGH7Z3HxBTKlIcXwC200ABHI5Xsu');

const SIDEBAR_ITEMS = ['Profile', 'Payment'];

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
    paymentInfo {
      stripeId
      paymentMethodId
      address {
        city
        state
        line1
        postal_code
      }
      card {
        brand
        last4
        exp_month
        exp_year
      }
    }
  }
}
`;

const UPDATE_BUSINESS = gql`
mutation update ($business: BusinessInput!) {
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
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  const { data, error: getError } = useQuery(GET_BUSINESS, { variables: { businessId: user?.uid }, skip: !user });
  const [updateBusiness, { loading: isUpdatingBusiness, error: isUpdatingError }] = useMutation(UPDATE_BUSINESS);

  if (getError) console.log(getError);

  const save = (business, optimisticResponse) => {
    if (!optimisticResponse) {
      updateBusiness({ variables: { business } });
    } else {
      updateBusiness({ variables: { business }, optimisticResponse });
    }
  };

  const businessAddress = data?.getBusiness ? {
    address: data.getBusiness.street_address,
    state: data.getBusiness.state,
    city: data.getBusiness.city,
  } : {};

  return (
    <Elements stripe={stripePromise}>
      <PageTransition transitionTime={700}>
        <SEO title="Dashboard" />

        <div className={dashboardStyles.dashboardContainer}>
          <DashboardHeader items={SIDEBAR_ITEMS} setActive={setActive} />
          <LeftSidebar active={active} setActive={setActive} items={SIDEBAR_ITEMS} data={data?.getBusiness} />

          {active === 'Profile' && (
            <ProfileScreen
              data={data?.getBusiness}
              save={save}
              isSaving={isUpdatingBusiness || saving}
              setSaving={setSaving}
              saveError={isUpdatingError}
              getQuery={GET_BUSINESS}
            />
          )}

          {active === 'Payment' && (
            <PaymentScreen paymentInfo={data?.getBusiness?.paymentInfo} businessAddress={businessAddress} />
          )}

          {(!user || !data) && <Backdrop />}
        </div>
      </PageTransition>
    </Elements>
  );
};

export default Dashboard;
