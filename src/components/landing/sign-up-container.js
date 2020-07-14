import React, { useState, useEffect } from 'react';
import Ripples from 'react-ripples';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import mainStyles from '../../styles/index.module.scss';

const SignUpContainer = ({
  signUp, errors, input, onChange, submitted,
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
      <div className={mainStyles.titleText}>
        <div>Share the <span style={{ fontWeight: 500 }}>best boba </span>
          with the <span style={{ fontWeight: 500 }}>best people.</span>
        </div>
      </div>

      <div className={mainStyles.subtext}>Sign up for updates</div>

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

export default SignUpContainer;
