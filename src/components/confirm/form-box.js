import React from 'react';
import Loader from 'react-loader-spinner';
import confirmStyles from '../../styles/confirm.module.scss';

const FormBox = ({
  children, title, error, enabled, submit, loading, fullLoading,
}) => {
  return (
    <div className={`sign-up-form ${confirmStyles.signUp}`}>
      <div className="title">{title}</div>
      <div className={confirmStyles.error}>{error}</div>

      <form>
        {children}
      </form>

      <button type="button" className="submit" disabled={!enabled || loading} onClick={submit}>
        Next
        {loading
        && (
          <div style={{ marginLeft: '15px' }}>
            <Loader type="ThreeDots" color="white" height={20} />
          </div>
        )}
      </button>

      {fullLoading && (
        <div className={confirmStyles.backdrop}>
          <Loader type="Oval" color="rgba(0,0,0,0.7)" height={80} />
        </div>
      )}
    </div>
  );
};

export default FormBox;
