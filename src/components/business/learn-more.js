import React from 'react';
import Img from 'gatsby-image';
import BottomText from './bottom-text';
import { RightArrow } from './business-assets';

const LearnMorePage = ({ height, images, width }) => {
  return (
    <div className="page container" id="learn-more-page">
      <div className="container-tri">
        <div>
          <div className="learn-more-circle">1</div>
          <RightArrow style={{ left: '25vw' }} />
        </div>

        <div className="title-text">
          Users <span style={{ fontWeight: 500 }}>receive a recommendation</span> about your boba shop from friends who have shopped there recently.
        </div>

        <Img fixed={images[0]} className="learn-more-image" />
      </div>

      <div className="container-tri">
        <div>
          <div className="learn-more-circle">2</div>
          <RightArrow style={{ left: '60vw' }} />
        </div>

        <Img fixed={images[1]} className="learn-more-image" />

        <div className="title-text">
          After making a purchase, <span style={{ fontWeight: 500 }}>customers receive cash back</span> and can recommend your boba to <span style={{ fontWeight: 500 }}>more friends.</span>
        </div>
      </div>

      <div className="container-tri">
        <div className="learn-more-circle">3</div>

        <div className="title-text">
          Your business will receive <span style={{ fontWeight: 500 }}>in-depth analytics</span> about buyer trends, customer preferences, and advertising metrics.
        </div>

        <Img fixed={images[2]} className="learn-more-image" />
      </div>

      <BottomText text="Sign up" color="white" fromTop={width < 960 ? (height * 4) - 80 : (height * 2) - 80} />
    </div>
  );
};

export default LearnMorePage;
