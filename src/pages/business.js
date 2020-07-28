/* eslint-disable react/no-unused-state */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, createRef } from 'react';
import ScrollSnap from 'scroll-snap';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import {
  IntroPage, LearnMorePage, SignUpPage, BusinessHeader,
} from '../components/business';
import { SideBar } from '../components/business/business-assets';
import businessStyles from '../styles/business.module.scss';

class Business extends Component {
  business = createRef();

  signUp = createRef();

  intro = createRef();

  learnMore = createRef();

  constructor(props) {
    super(props);

    this.state = {
      windowHeight: 0,
      windowWidth: 0,
      scrollPosition: 0,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  bind = () => {
    const element = this.business.current;
    this.snapElement = new ScrollSnap(element, {
      snapDestinationY: '100%',
      duration: 300,
      timeout: 150,
    });
    this.snapElement.bind(this.onSnap);
  }

  unbind = () => {
    if (this.snapElement) {
      this.snapElement.unbind(this.onSnap);
      this.snapElement = null;
    }
  }

  onSnap = () => {
    console.log('snap');
  }

  onScroll = () => {
    this.setState({ scrollPosition: this.business.current.scrollTop });
  }

  updateWindowDimensions = () => {
    this.setState({ windowHeight: window.innerHeight, windowWidth: window.innerWidth });
    if (window.innerWidth < 960) {
      this.unbind();
    } else {
      this.bind();
    }
  }

  scrollToSignUp = () => {
    console.log(this.signUp);
    this.signUp.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const wh = this.state.windowHeight;
    const { data } = this.props;
    const images = [data.delivery.childImageSharp.fixed, data.borrow.childImageSharp.fixed, data.report.childImageSharp.fixed];

    return (
      <div onScroll={this.onScroll} className={businessStyles.business}>
        <BusinessHeader scrollPosition={this.state.scrollPosition} scroll={this.scrollToSignUp} refs={[this.intro, this.learnMore, this.signUp]} />
        {this.state.windowWidth > 960 ? <SideBar selected={Math.floor((this.state.scrollPosition + 0.45 * wh) / wh)} /> : <></>}

        <div className={businessStyles.businessContainer} ref={this.business}>
          <SEO title="Businesses" />
          <IntroPage scroll={this.scrollToSignUp} height={wh} setRef={this.intro} />
          <LearnMorePage
            height={wh}
            images={images}
            width={this.state.windowWidth}
            setRef={this.learnMore}
          />
          <SignUpPage setRef={this.signUp} />
        </div>
      </div>
    );
  }
}

export const query = graphql`
  query {
    delivery: file(relativePath: { eq: "delivery.png" }) {
      childImageSharp {
        fixed(width: 250, height: 250) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    },
    borrow: file(relativePath: { eq: "borrow.png" }) {
      childImageSharp {
        fixed(width: 250, height: 250) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    },
    report: file(relativePath: { eq: "report.png" }) {
      childImageSharp {
        fixed(width: 250, height: 250) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`;

export default Business;
