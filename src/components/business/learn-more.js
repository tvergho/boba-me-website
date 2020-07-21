import React from 'react';
import Img from 'gatsby-image';
import BottomText from './bottom-text';
import { RightArrow } from './business-assets';
import businessStyles from '../../styles/business.module.scss';

const LearnMorePage = ({
  height, images, width, setRef,
}) => {
  return (
    <div className={`${businessStyles.page} container ${businessStyles.learnMorePage}`} ref={setRef}>
      <div className="container-tri">
        <div>
          <div className={businessStyles.learnMoreCircle}>1</div>
          <RightArrow style={{ left: '25vw' }} />
        </div>

        <div className={businessStyles.titleText}>
          Users <span style={{ fontWeight: 500 }}>receive a recommendation</span> about your boba shop from friends who have shopped there recently.
        </div>

        <Img fixed={images[0]} className={businessStyles.learnMoreImage} />
      </div>

      <div className="container-tri">
        <div>
          <div className={businessStyles.learnMoreCircle}>2</div>
          <RightArrow style={{ left: '58vw' }} />
        </div>

        <Img fixed={images[1]} className={businessStyles.learnMoreImage} />

        <div className={businessStyles.titleText}>
          After making a purchase, <span style={{ fontWeight: 500 }}>customers receive cash back</span> and can recommend your boba to <span style={{ fontWeight: 500 }}>more friends.</span>
        </div>
      </div>

      <div className="container-tri">
        <div className={businessStyles.learnMoreCircle}>3</div>

        <div className={businessStyles.titleText}>
          Your business will receive <span style={{ fontWeight: 500 }}>in-depth analytics</span> about buyer trends, customer preferences, and advertising metrics.
        </div>

        <Img fixed={images[2]} className={businessStyles.learnMoreImage} />
      </div>

      <BottomText text="Sign up" color="white" fromTop={width < 960 ? (height * 4) - 80 : (height * 2) - 80} />
    </div>
  );
};

export default LearnMorePage;
