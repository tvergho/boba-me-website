import React from 'react';
import BottomText from './bottom-text';
import Cup from '../cup';
import businessStyles from '../../styles/business.module.scss';

const IntroPage = ({ scroll, height, setRef }) => {
  return (
    <div className={`${businessStyles.page} container ${businessStyles.introPage}`} ref={setRef}>
      <div className="container-half">
        <div className={businessStyles.titleText}>
          Leverage social networks to <span style={{ fontWeight: 500 }}>expand your consumer base </span>
          and <span style={{ fontWeight: 500 }}>compete with other shops.</span>
        </div>

        <button className={`${businessStyles.businessButton} ${businessStyles.signInMain} ${businessStyles.white}`} type="button" onClick={scroll}>Sign up for our beta</button>
      </div>

      <div className="container-half">
        <Cup background="white" className={businessStyles.cup} />
      </div>

      <BottomText color="#FFB7B2" text="Learn more" fromTop={height - 80} />
    </div>
  );
};

export default IntroPage;
