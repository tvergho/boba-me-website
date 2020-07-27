import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { navigate } from 'gatsby';
import useAuth from '../../utils/useAuth';
import businessStyles from '../../styles/business.module.scss';

const GET_BUSINESS_NAME = gql`
query getBusiness ($businessId: ID!) {
  getBusiness(input: $businessId) {
    businessId
    name
  }
}
`;

const SignedIn = ({
  user, styleClass, nameClass, buttonClass,
}) => {
  if (!user) return <div className="signed-in-header" />;

  const { data } = useQuery(GET_BUSINESS_NAME, { variables: { businessId: user.uid } });
  const { signOut } = useAuth();

  return (
    <div className="signed-in-header">
      <button type="button" className="button-text" onClick={() => { navigate('/dashboard'); }}>
        <div className={`name ${nameClass}`}>{data?.getBusiness !== null && data?.getBusiness !== undefined && data?.getBusiness?.name ? `Welcome, ${data?.getBusiness?.name}` : ''}</div>
      </button>
      <button type="button" className={`${businessStyles.signIn} ${styleClass} ${buttonClass}`} onClick={signOut}>Sign out</button>
    </div>
  );
};

export default SignedIn;
