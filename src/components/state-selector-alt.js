import React from 'react';
import states from '@components/states';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';
import { getStateValueFromCode } from './state-selector';

const StateSelectorAlt = ({ onChange, value, style }) => {
  return (
    <div style={style}>
      <Select
        label="State"
        onChange={(e) => { onChange(getStateValueFromCode(e.target.value)); }}
        value={value.value}
        fullWidth
        classes={{ root: 'state-selector-alt' }}
      >
        {states.map((state) => {
          return (
            <MenuItem key={state.value} value={state.value}>{state.label}</MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

StateSelectorAlt.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
};

export default StateSelectorAlt;
