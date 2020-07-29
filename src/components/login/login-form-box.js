import React from 'react';
import { Fade } from 'react-awesome-reveal';
import loginStyles from '../../styles/login.module.scss';
import Loading from '../lottie/loading';

const LoginFormBox = ({
  loading, children, title, error,
}) => {
  return (
    <Fade duration={300}>
      <div className={loginStyles.loginForm}>
        <div style={{ marginBottom: '20px' }}>
          <div className={loginStyles.title}>{title}</div>
          <div className={loginStyles.error}>{error}</div>
        </div>

        {children}

        {loading && (
          <div className="backdrop">
            <Loading style={{ marginTop: '5vh' }} />
          </div>
        )}
      </div>
    </Fade>
  );
};

export default LoginFormBox;
