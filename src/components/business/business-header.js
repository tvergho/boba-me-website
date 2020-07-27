import React from 'react';
import Sticky from 'react-stickynode';
import { gql, useQuery } from '@apollo/client';
import { navigate } from '@reach/router';
import { BusinessLogo, ForMerchantsText } from './business-assets';
import businessStyles from '../../styles/business.module.scss';
import useAuth from '../../utils/useAuth';

const GET_BUSINESS_NAME = gql`
query getBusiness ($businessId: ID!) {
  getBusiness(input: $businessId) {
    name
  }
}
`;

const SignedIn = ({ user, styleClass }) => {
  console.log(user);
  const { data } = useQuery(GET_BUSINESS_NAME, { variables: { businessId: user.uid } });
  const { signOut } = useAuth();
  console.log(data);

  return (
    <div className="signed-in-header">
      <div className="name">{data?.getBusiness !== null && data?.getBusiness !== undefined && data?.getBusiness?.name ? `Welcome, ${data?.getBusiness?.name}` : ''}</div>
      <button type="button" className={`${businessStyles.signIn} ${businessStyles.businessButton} ${styleClass}`} onClick={signOut}>Sign out</button>
    </div>
  );
};

const SignedOut = ({ styleClass }) => {
  return (
    <div className="signed-in-header">
      <button type="button" className={`${businessStyles.signIn} ${businessStyles.businessButton} ${styleClass}`} onClick={() => { navigate('/dashboard/login'); }}>Sign in</button>
    </div>
  );
};

const BusinessHeader = ({
  scrollPosition, scroll, refs, pink, backgroundClass, hide,
}) => {
  const { user } = useAuth();

  let styleClass = '';
  let primaryColor = '';

  if (pink || (refs && refs[0].current && scrollPosition >= refs[1].current.offsetTop && scrollPosition < refs[2].current.offsetTop)) {
    styleClass = businessStyles.pink;
    primaryColor = 'white';
  } else {
    styleClass = businessStyles.white;
    primaryColor = '#FFB7B2';
  }

  return (
    <Sticky innerZ={99}>
      <div className={`${businessStyles.businessHeader} ${styleClass} ${backgroundClass}`}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <BusinessLogo width="60px" height="60px" color={primaryColor} />
          <ForMerchantsText style={{ marginLeft: '20px', marginRight: '10px' }} color={primaryColor} />
        </div>

        {scroll && !user && !hide && <button type="button" className={`${businessStyles.signIn} ${businessStyles.businessButton} ${styleClass}`} onClick={scroll}>Sign up</button>}
        {user && !hide && <SignedIn user={user} styleClass={styleClass} />}
        {!scroll && !user && !hide && <SignedOut styleClass={styleClass} />}
      </div>
    </Sticky>
  );
};

export default BusinessHeader;
