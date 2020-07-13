import React from 'react';
import Sticky from 'react-stickynode';
import { BusinessLogo, ForMerchantsText } from './business-assets';

const BusinessHeader = ({ scrollPosition, windowHeight }) => {
  let styleClass = '';
  let primaryColor = '';

  if (Math.floor(scrollPosition / windowHeight) % 2 !== 0) {
    styleClass = 'pink';
    primaryColor = 'white';
  } else {
    styleClass = 'white';
    primaryColor = '#FFB7B2';
  }

  return (
    <Sticky innerZ={99}>
      <div id="business-header" className={styleClass}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <BusinessLogo width="60px" height="60px" color={primaryColor} />
          <ForMerchantsText style={{ marginLeft: '20px' }} color={primaryColor} />
        </div>

        <button type="button" className={`sign-in-button ${styleClass}`}>Sign up</button>
      </div>
    </Sticky>
  );
};

export default BusinessHeader;
