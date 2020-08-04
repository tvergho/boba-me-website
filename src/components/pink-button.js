import React from 'react';
import PropTypes from 'prop-types';

const PinkButton = ({
  style, children, disabled, onClick, className,
}) => {
  return (
    <button className={`default-button ${className || ''}`} style={style} type="button" disabled={disabled} onClick={onClick}>{children}</button>
  );
};

PinkButton.propTypes = {
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default PinkButton;
