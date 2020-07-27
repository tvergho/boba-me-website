/* eslint-disable no-unused-vars */
import React from 'react';
import { Slide } from 'react-awesome-reveal';
import loginStyles from '@styles/login.module.scss';

const WithSlide = ({ children, pageLoaded, disappear }) => {
  if (!pageLoaded) return children;
  return (
    <Slide reverse={disappear} direction="right">
      {children}
    </Slide>
  );
};

const LoginForm = ({
  onChange, submit, forgot, disappear, pageLoaded,
}) => {
  return (
    <div className="test" style={disappear ? { visibility: 'hidden', display: 'none' } : {}}>
      <WithSlide pageLoaded={pageLoaded} disappear={disappear}>

        <div style={{ marginBottom: '10vh' }}>
          <input placeholder="Email" onChange={(e) => { onChange(e.target.value, 'email'); }} />
          <input placeholder="Password" type="password" onChange={(e) => { onChange(e.target.value, 'password'); }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <button type="button" className="submit" onClick={submit}>Sign in</button>
          <button type="button" className={`button-text ${loginStyles.forgot}`} onClick={forgot}>Forgot your password?</button>
        </div>

      </WithSlide>
    </div>
  );
};

export default LoginForm;
