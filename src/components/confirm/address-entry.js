import React from 'react';
import { FormControlLabel, Checkbox, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import confirmStyles from '@styles/confirm.module.scss';
import StateSelectorAlt from '@components/state-selector-alt';

const AddressEntry = ({ values, setters }) => {
  const {
    address, city, stateCode, useBusinessAddress,
  } = values;
  const {
    setAddress, setCity, setStateCode, setUseBusinessAddress,
  } = setters;

  return (
    <div style={{
      display: 'flex', width: '100%', alignItems: 'flex-start', marginTop: '20px', flexDirection: 'column',
    }}
    >
      <FormControlLabel
        control={<Checkbox color="primary" checked={useBusinessAddress} onChange={(e) => { setUseBusinessAddress(e.target.checked); }} />}
        label="Use business address"
        classes={{ label: confirmStyles.label }}
      />

      <div style={useBusinessAddress ? { display: 'none' } : { width: '100%' }}>
        <TextField
          variant="outlined"
          label="Street Address"
          value={address}
          onChange={(e) => { setAddress(e.target.value); }}
          size="small"
          fullWidth
          margin="normal"
        />
        <TextField
          variant="outlined"
          label="City"
          value={city}
          onChange={(e) => { setCity(e.target.value); }}
          size="small"
          fullWidth
          margin="normal"
        />
        <StateSelectorAlt
          onChange={(val) => { setStateCode(val); }}
          value={stateCode}
          style={{ marginTop: '10px' }}
        />
      </div>
    </div>
  );
};

AddressEntry.propTypes = {
  values: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    stateCode: PropTypes.object,
    useBusinessAddress: PropTypes.bool,
  }).isRequired,
  setters: PropTypes.shape({
    setAddress: PropTypes.func,
    setCity: PropTypes.func,
    setStateCode: PropTypes.func,
    setUseBusinessAddress: PropTypes.func,
  }).isRequired,
};

export default AddressEntry;
