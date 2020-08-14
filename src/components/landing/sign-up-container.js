import React, { useState, useEffect } from 'react';
import Ripples from 'react-ripples';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import mainStyles from '../../styles/index.module.scss';
import SignUpPromo from './sign-up-promo';

const SignUpContainer = ({
  signUp, errors, input, onChange, submitted, google, apple,
}) => {
  const { firstName, lastName, email } = input;

  const [delayedSubmit, setDelayedSubmit] = useState(false);

  useEffect(() => {
    if (submitted) {
      setTimeout(() => { setDelayedSubmit(true); }, 700);
    }
  }, [submitted]);

  return (
    <div className={`container-half ${mainStyles.containerHalf} left`}>
      <SignUpPromo google={google} apple={apple} />

      <div className={mainStyles.submitted} style={{ display: delayedSubmit ? 'block' : 'none' }}>
        <FontAwesomeIcon icon={faCheckCircle} size="3x" style={{ marginTop: '30px' }} />
        <div className={mainStyles.submittedText}>Your information has been submitted.</div>
      </div>

      <form className={`${mainStyles.signUpForm} ${submitted ? 'rotate-out-2-cw' : ''}`} style={{ display: delayedSubmit ? 'none' : 'flex' }}>
        <input type="text"
          placeholder="first name"
          value={firstName}
          onChange={onChange}
          name="firstName"
          id="firstName"
          style={{ border: errors.firstName ? '2px solid red' : '' }}
        />
        <input type="text"
          placeholder="last name"
          name="lastName"
          value={lastName}
          onChange={onChange}
          id="lastName"
          style={{ border: errors.lastName ? '2px solid red' : '' }}
        />
        <input type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={onChange}
          id="email"
          style={{ border: errors.email ? '2px solid red' : '' }}
        />
        <Ripples during={1500}><button type="button" className={mainStyles.submit} onClick={signUp}>Submit</button></Ripples>
      </form>
    </div>
  );
};

SignUpContainer.propTypes = {
  signUp: PropTypes.func,
  errors: PropTypes.shape({
    firstName: PropTypes.bool,
    lastName: PropTypes.bool,
    email: PropTypes.bool,
  }),
  input: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  onChange: PropTypes.func,
  submitted: PropTypes.bool,
  google: PropTypes.object,
  apple: PropTypes.object,
};

export default SignUpContainer;
