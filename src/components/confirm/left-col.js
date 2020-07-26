import React from 'react';
import Select from 'react-select';
import confirmStyles from '../../styles/confirm.module.scss';
import states from './states';
import useWindowSize from '../../utils/useWindowSize';

const LeftCol = ({
  address, setAddress, city, setCity, stateCode, setStateCode, zip, setZip,
}) => {
  const { width } = useWindowSize();

  const controlStyles = {
    marginBottom: '15px',
    borderRadius: '10px',
    fontWeight: 300,
    padding: '5px 10px',
    fontSize: width < 768 ? '14px' : '20px',
    color: 'rgba(0,0,0,0.9)',
  };

  return (
    <div className={confirmStyles.col}>
      <input placeholder="Street Address" name="address" id="address" value={address} onChange={(e) => { setAddress(e.target.value); }} />
      <input placeholder="City" name="city" id="city" value={city} onChange={(e) => { setCity(e.target.svalue); }} />
      <div style={{ overflow: 'visible' }}>
        <Select options={states}
          defaultValue={states[5]}
          styles={{
            control: (base) => ({
              ...base, ...controlStyles,
            }),
            input: (base) => ({
              ...base, marginBottom: '0px',
            }),
          }}
          value={stateCode}
          onChange={(val) => { setStateCode(val); }}
        />
      </div>
      <input placeholder="Zip Code" name="zip" id="zip" value={zip} onChange={(e) => { setZip(e.target.value); }} />
    </div>
  );
};

export default LeftCol;
