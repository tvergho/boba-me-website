import React from 'react';
import Loading from '@components/lottie/loading';
import Loader from 'react-loader-spinner';
import confirmStyles from '@styles/confirm.module.scss';
import PropTypes from 'prop-types';

const FormBox = ({
  children, title, error, enabled = false, submit, loading, fullLoading,
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
        <div className="backdrop">
          <Loading />
        </div>
      )}
    </div>
  );
};

FormBox.propTypes = {
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  enabled: PropTypes.bool,
  submit: PropTypes.func,
  loading: PropTypes.bool,
  fullLoading: PropTypes.bool,
};

export default FormBox;
