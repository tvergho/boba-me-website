import React from 'react';
import Sticky from 'react-stickynode';
import { BusinessLogo, ForMerchantsText } from './business-assets';
import businessStyles from '../../styles/business.module.scss';

const BusinessHeader = ({
  scrollPosition, windowHeight, scroll, refs,
}) => {
  let styleClass = '';
  let primaryColor = '';
  if (refs[0].current) {
    console.log(refs[0].current.offsetTop, refs[1].current.offsetTop, refs[2].current.offsetTop);
  }

  if (refs[0].current && scrollPosition >= refs[1].current.offsetTop && scrollPosition < refs[2].current.offsetTop) {
    styleClass = businessStyles.pink;
    primaryColor = 'white';
  } else {
    styleClass = businessStyles.white;
    primaryColor = '#FFB7B2';
  }

  return (
    <Sticky innerZ={99}>
      <div className={`${businessStyles.businessHeader} ${styleClass}`}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <BusinessLogo width="60px" height="60px" color={primaryColor} />
          <ForMerchantsText style={{ marginLeft: '20px', marginRight: '10px' }} color={primaryColor} />
        </div>

        <button type="button" className={`${businessStyles.signIn} ${businessStyles.businessButton} ${styleClass}`} onClick={scroll}>Sign up</button>
      </div>
    </Sticky>
  );
};

export default BusinessHeader;
