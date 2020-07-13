/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, createRef } from 'react';
import ScrollSnap from 'scroll-snap';
import SEO from '../components/seo';
import {
  IntroPage, LearnMorePage, SignUpPage, BusinessHeader,
} from '../components/business';

class Business extends Component {
  business = createRef();

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const element = this.business.current;
    const snapElement = new ScrollSnap(element, {
      snapDestinationY: '100%',
      duration: 150,
    });
    snapElement.bind(this.onSnap);
  }

  onSnap = () => {
    console.log('snap');
  }

  render() {
    return (
      <>
        <BusinessHeader />
        <div id="business" ref={this.business}>
          <SEO title="Businesses" />
          <IntroPage />
          <LearnMorePage />
          <SignUpPage />
        </div>
      </>
    );
  }
}

export default Business;
