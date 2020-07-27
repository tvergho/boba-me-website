import React from 'react';
import { gql, useQuery } from '@apollo/client';
import useAuth from '../../utils/useAuth';
import businessStyles from '../../styles/business.module.scss';

const GET_BUSINESS_NAME = gql`
query getBusiness ($businessId: ID!) {
  getBusiness(input: $businessId) {
    name
  }
}
`;

const SignedIn = ({ user, styleClass }) => {
  if (!user) return <div className="signed-in-header" />;

  const { data } = useQuery(GET_BUSINESS_NAME, { variables: { businessId: user.uid } });
  const { signOut } = useAuth();

  return (
    <div className="signed-in-header">
      <div className="name">{data?.getBusiness !== null && data?.getBusiness !== undefined && data?.getBusiness?.name ? `Welcome, ${data?.getBusiness?.name}` : ''}</div>
      <button type="button" className={`${businessStyles.signIn} ${businessStyles.businessButton} ${styleClass}`} onClick={signOut}>Sign out</button>
    </div>
  );
};

export default SignedIn;
