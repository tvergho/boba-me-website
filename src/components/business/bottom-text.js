import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import businessStyles from '../../styles/business.module.scss';

const BottomText = ({ text, color, fromTop }) => {
  return (
    <div className={businessStyles.bottomText} style={{ top: fromTop }}>
      <div style={{ color }}>{text}</div>
      <FontAwesomeIcon icon={faChevronDown} color={color} />
    </div>
  );
};

export default BottomText;
