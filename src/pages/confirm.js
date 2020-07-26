/* eslint-disable no-unused-expressions */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import { navigate } from 'gatsby';
import { BusinessHeader } from '../components/business';
import confirmStyles from '../styles/confirm.module.scss';
import { AccountDetails, BusinessDetails, Completed } from '../components/confirm';
import SEO from '../components/seo';
import 'firebase/auth';

const auth = firebase.auth();

class ConfirmSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };
  }

  componentDidMount() {
    if (!firebase.auth().isSignInWithEmailLink(window.location.href)) {
      navigate('/business');
    }
  }

  increment = () => {
    this.setState((prevState) => { return { step: prevState.step + 1 }; });
  }

  render() {
    return (
      <>
        <SEO title="Confirm Sign Up" />
        <BusinessHeader />
        <div className={confirmStyles.background}>
          <div className={confirmStyles.pageHeader}>{typeof window !== 'undefined' && window.innerHeight < 600 ? 'Confirm Account' : 'Confirm Your Business Account'}</div>
          {this.state.step === 0 && <AccountDetails auth={auth} increment={this.increment} />}
          {this.state.step === 1 && <BusinessDetails auth={auth} increment={this.increment} />}
          {this.state.step >= 2 && <Completed />}
        </div>
      </>
    );
  }
}

export default ConfirmSignUp;
