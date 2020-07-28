import React from 'react';
import Sticky from 'react-stickynode';
import { navigate } from '@reach/router';
import { BusinessLogo, ForMerchantsText } from './business-assets';
import businessStyles from '../../styles/business.module.scss';
import useAuth from '../../utils/useAuth';
import SignedIn from './signed-in';

const SignedOut = ({ styleClass }) => {
  return (
    <div className="signed-in-header">
      <button type="button" className={`${businessStyles.signIn} ${businessStyles.businessButton} ${styleClass}`} onClick={() => { navigate('/dashboard/login'); }}>Sign in</button>
    </div>
  );
};

const UseSticky = ({ use, children }) => {
  if (!use) return children;

  return (
    <Sticky innerZ={99}>
      {children}
    </Sticky>
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
    <UseSticky use={scroll}>
      <div className={`${businessStyles.businessHeader} ${styleClass} ${backgroundClass}`}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <BusinessLogo width="60px" height="60px" color={primaryColor} />
          <ForMerchantsText style={{ marginLeft: '20px', marginRight: '10px' }} color={primaryColor} />
        </div>

        {scroll && !user && !hide && <button type="button" className={`${businessStyles.signIn} ${businessStyles.businessButton} ${styleClass}`} onClick={scroll}>Sign up</button>}
        {user && !hide && <SignedIn user={user} styleClass={styleClass} buttonClass={businessStyles.businessButton} />}
        {!scroll && !user && !hide && <SignedOut styleClass={styleClass} />}
      </div>
    </UseSticky>
  );
};

export default BusinessHeader;
