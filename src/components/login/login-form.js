import React from 'react';
import Lottie from 'react-lottie';
import loginStyles from '../../styles/login.module.scss';
import * as animationData from './preloader.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const LoginForm = ({
  onChange, error, loading, submit,
}) => {
  return (
    <div className={loginStyles.loginForm}>
      <div style={{ marginBottom: '20px' }}>
        <div className={loginStyles.title}>Business Login</div>
        <div className={loginStyles.error}>{error}</div>
      </div>

      <div style={{ marginBottom: '10vh' }}>
        <input placeholder="Email" onChange={(e) => { onChange(e.target.value, 'email'); }} />
        <input placeholder="Password" type="password" onChange={(e) => { onChange(e.target.value, 'password'); }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <button type="button" className="submit" onClick={submit}>Sign in</button>
        <button type="button" className={`button-text ${loginStyles.forgot}`}>Forgot your password?</button>
      </div>

      {loading && (
        <div className="backdrop">
          <Lottie options={defaultOptions}
            height="40vh"
            width="30vw"
            style={{ marginTop: '5vh' }}
          />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
