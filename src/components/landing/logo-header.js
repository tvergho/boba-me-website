import React from 'react';
import Img from 'gatsby-image';
import LogoSVG from './logo';

const LogoHeader = ({ logo }) => {
  return (
    <div className="logo-header">
      <Img fixed={logo} className="logo-image" />
      <LogoSVG />
    </div>
  );
};

export default LogoHeader;
