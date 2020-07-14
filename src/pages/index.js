import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { LogoHeader, SignUpContainer, BobaContainer } from '../components/landing';
import SEO from '../components/seo';

const axios = require('axios');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        firstName: '',
        lastName: '',
        email: '',
      },
      errors: {
        firstName: false,
        lastName: false,
        email: false,
      },
      submitted: false,
    };
  }

  validateInput = () => {
    const { errors } = this.state;
    const { firstName, lastName, email } = this.state.input;
    let isError = false;
    if (firstName.trim().length <= 0) {
      isError = true;
      errors.firstName = true;
    }
    if (lastName.trim().length <= 0) {
      isError = true;
      errors.lastName = true;
    }
    if (email.trim().length <= 0) {
      isError = true;
      errors.email = true;
    }

    this.setState({ errors });
    console.log(errors);
    return isError;
  }

  signUp = () => {
    if (!this.validateInput()) {
      this.setState({ submitted: true });
      const params = {
        method: 'POST',
        url: 'https://03q30dqfqi.execute-api.us-east-2.amazonaws.com/dev/interest',
        data: this.state.input,
      };
      axios(params);
    }
  }

  onChange = (e) => {
    const { id, value } = e.target;
    const { input, errors } = this.state;
    input[id] = value;
    errors[id] = false;
    this.setState({ input, errors });
    console.log(input);
  }

  render() {
    const { data } = this.props;
    return (
      <div className="landing">
        <SEO title="Home" />
        <LogoHeader logo={data.logo.childImageSharp.fixed} />

        <div id="landing-container" className="container">
          <SignUpContainer errors={this.state.errors} signUp={this.signUp} input={this.state.input} onChange={this.onChange} submitted={this.state.submitted} />
          <BobaContainer />
        </div>
      </div>
    );
  }
}

export const query = graphql`
  query {
    logo: file(relativePath: { eq: "white-logo.png" }) {
      childImageSharp {
        fixed(width: 75, height: 75) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`;

export default Home;
