import React from 'react';
import Img from 'gatsby-image';
import LogoSVG from './logo';
import mainStyles from '../../styles/index.module.scss';

const LogoHeader = ({ logo }) => {
  return (
    <div className={mainStyles.logoHeader}>
      <Img fixed={logo} className={mainStyles.logoImage} />
      <LogoSVG />
    </div>
  );
};

export default LogoHeader;
