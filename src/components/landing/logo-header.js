import React from 'react';
import Img from 'gatsby-image';
import mainStyles from '@styles/index.module.scss';
import PinkButton from '@components/pink-button';
import { navigate } from 'gatsby';
import LogoSVG from './logo';

const LogoHeader = ({ logo }) => {
  return (
    <>
      <div className={mainStyles.logoHeader}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Img fixed={logo} className={mainStyles.logoImage} />
          <LogoSVG />
        </div>

        <PinkButton className={mainStyles.businessButton} onClick={() => { navigate('/business'); }}>For Businesses</PinkButton>
      </div>

    </>
  );
};

export default LogoHeader;
