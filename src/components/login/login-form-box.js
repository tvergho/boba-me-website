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

const LoginFormBox = ({
  loading, children, title, error,
}) => {
  return (
    <div className={loginStyles.loginForm}>
      <div style={{ marginBottom: '20px' }}>
        <div className={loginStyles.title}>{title}</div>
        <div className={loginStyles.error}>{error}</div>
      </div>

      {children}

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

export default LoginFormBox;
