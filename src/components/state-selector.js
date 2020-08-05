import React from 'react';
import Select from 'react-select';
import states from '@components/states';
import useWindowSize from '@utils/useWindowSize';
import PropTypes from 'prop-types';

export function getStateValueFromCode(code) {
  if (code === 'CA') {
    return {
      label: 'California',
      value: 'CA',
    };
  }

  for (const object of states) {
    if (object.value === code) return object;
  }
  return null;
}

const StateSelector = ({ onChange, value, style }) => {
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
    <div style={{ overflow: 'visible' }} className="state-selector">
      <Select options={states}
        defaultValue={states[5]}
        styles={{
          container: (base) => ({
            ...base, ...style,
          }),
          control: (base) => ({
            ...base, ...controlStyles,
          }),
          input: (base) => ({
            ...base, marginBottom: '0px',
          }),
        }}
        value={value}
        onChange={(val) => { onChange(val); }}
      />
    </div>
  );
};

StateSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  style: PropTypes.object,
};

export default StateSelector;
