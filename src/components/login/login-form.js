import React from 'react';
import loginStyles from '../../styles/login.module.scss';
import LoginFormBox from './login-form-box';

const LoginForm = ({
  onChange, error, loading, submit, forgot,
}) => {
  return (
    <LoginFormBox loading={loading} title="Business Login" error={error}>
      <div style={{ marginBottom: '10vh' }}>
        <input placeholder="Email" onChange={(e) => { onChange(e.target.value, 'email'); }} />
        <input placeholder="Password" type="password" onChange={(e) => { onChange(e.target.value, 'password'); }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <button type="button" className="submit" onClick={submit}>Sign in</button>
        <button type="button" className={`button-text ${loginStyles.forgot}`} onClick={forgot}>Forgot your password?</button>
      </div>
    </LoginFormBox>
  );
};

export default LoginForm;
