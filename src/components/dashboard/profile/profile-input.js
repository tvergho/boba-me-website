import React from 'react';
import dashboardStyles from '@styles/dashboard.module.scss';
import Input from 'react-phone-number-input/input';
import StateSelector from '@components/state-selector';

const ProfileInput = ({
  title, id, phone, onChange, value, state, password,
}) => {
  return (
    <div className={dashboardStyles.profileInput} style={state ? { overflow: 'visible', marginBottom: '32px' } : {}}>
      <h4>{title}</h4>
      {!phone && !state && <input onChange={(e) => { onChange(e.target.value, id); }} value={value} type={password ? 'password' : 'text'} />}
      {phone && <Input country="US" onChange={(val) => { onChange(val, id); }} value={value} />}
      {state && <StateSelector onChange={(val) => { onChange(val, id); }} value={value} />}
    </div>
  );
};

export default ProfileInput;
