import React from 'react';

const PinkButton = ({
  style, children, disabled, onClick,
}) => {
  return (
    <button className="default-button" style={style} type="button" disabled={disabled} onClick={onClick}>{children}</button>
  );
};

export default PinkButton;
