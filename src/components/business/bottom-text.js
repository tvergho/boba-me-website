import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const BottomText = ({ text, color, fromTop }) => {
  return (
    <div className="bottom-text" style={{ top: fromTop }}>
      <div style={{ color }}>{text}</div>
      <FontAwesomeIcon icon={faChevronDown} color={color} />
    </div>
  );
};

export default BottomText;
