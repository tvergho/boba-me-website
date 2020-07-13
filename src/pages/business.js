/* eslint-disable react/no-unused-state */
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

  businessContainer = createRef();

  constructor(props) {
    super(props);

    this.state = {
      windowHeight: 0,
      scrollPosition: 0,
    };
  }

  componentDidMount() {
    const element = this.business.current;
    const snapElement = new ScrollSnap(element, {
      snapDestinationY: '100%',
      duration: 150,
    });
    snapElement.bind(this.onSnap);

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  onSnap = () => {
    console.log('snap');
  }

  onScroll = () => {
    this.setState({ scrollPosition: this.business.current.scrollTop });
    console.log(this.business.current.scrollTop);
  }

  updateWindowDimensions = () => {
    this.setState({ windowHeight: window.innerHeight });
  }

  render() {
    return (
      <div onScroll={this.onScroll} ref={this.businessContainer}>
        <BusinessHeader scrollPosition={this.state.scrollPosition} windowHeight={this.state.windowHeight} />

        <div id="business" ref={this.business}>
          <SEO title="Businesses" />
          <IntroPage />
          <LearnMorePage />
          <SignUpPage />
        </div>
      </div>
    );
  }
}

export default Business;
