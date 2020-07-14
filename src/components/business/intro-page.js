import React from 'react';
import BottomText from './bottom-text';
import Cup from '../cup';

const IntroPage = ({ scroll, height, setRef }) => {
  return (
    <div className="page container" id="intro-page" ref={setRef}>
      <div className="container-half">
        <div className="title-text">
          <div>Leverage social networks to <span style={{ fontWeight: 500 }}>expand your consumer base </span>
            and <span style={{ fontWeight: 500 }}>compete with other shops.</span>
          </div>
        </div>

        <button className="business-button sign-in-main white" type="button" onClick={scroll}>Sign up for our beta</button>
      </div>

      <div className="container-half">
        <Cup background="white" />
      </div>

      <BottomText color="#FFB7B2" text="Learn more" fromTop={height - 80} />
    </div>
  );
};

export default IntroPage;
