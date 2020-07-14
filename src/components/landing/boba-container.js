import React from 'react';
import Cup from '../cup';
import mainStyles from '../../styles/index.module.scss';

const BobaContainer = () => {
  return (
    <div className="container-half">
      <Cup className={mainStyles.cup} />
    </div>
  );
};

export default BobaContainer;
