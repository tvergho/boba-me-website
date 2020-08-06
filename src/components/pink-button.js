import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const PinkButton = ({
  style, children, disabled, onClick, className, loading, loaderHeight = 20,
}) => {
  return (
    <button className={`default-button ${className || ''}`} style={style} type="button" disabled={disabled} onClick={onClick}>
      {children}
      {loading
        && (
          <div style={{ marginLeft: '15px' }}>
            <Loader type="ThreeDots" color="white" height={loaderHeight} />
          </div>
        )}
    </button>
  );
};

PinkButton.propTypes = {
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  loading: PropTypes.bool,
  loaderHeight: PropTypes.number,
};

export default PinkButton;
