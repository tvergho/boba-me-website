import React from 'react';
import mainStyles from '@styles/index.module.scss';
import Img from 'gatsby-image';

const SignUpPromo = ({ google, apple }) => {
  return (
    <>
      <div className={mainStyles.titleText}>
        <div>Share the <span style={{ fontWeight: 500 }}>best boba </span>
          with the <span style={{ fontWeight: 500 }}>best people.</span>
        </div>
      </div>

      <div className={mainStyles.comingSoonContainer}>
        <Img fixed={google} className={mainStyles.comingSoon} />
        <Img fixed={apple} className={mainStyles.comingSoon} />
      </div>

      <div className={mainStyles.subtext}>Sign up for updates</div>
    </>
  );
};

export default SignUpPromo;
