import React from 'react';
import StateSelector from '@components/state-selector';
import confirmStyles from '../../styles/confirm.module.scss';

const LeftCol = ({
  address, setAddress, city, setCity, stateCode, setStateCode, zip, setZip,
}) => {
  return (
    <div className={confirmStyles.col}>
      <input placeholder="Street Address" name="address" id="address" value={address} onChange={(e) => { setAddress(e.target.value); }} />
      <input placeholder="City" name="city" id="city" value={city} onChange={(e) => { setCity(e.target.value); }} />
      <StateSelector onChange={setStateCode} value={stateCode} />
      <input placeholder="Zip Code" name="zip" id="zip" value={zip} onChange={(e) => { setZip(e.target.value); }} />
    </div>
  );
};

export default LeftCol;
