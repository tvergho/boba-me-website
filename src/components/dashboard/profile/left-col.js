import React from 'react';
import ProfileInput from './profile-input';

const LeftCol = ({ onChange, values }) => {
  const {
    name, email, phone, website, password,
  } = values;
  return (
    <div>
      <ProfileInput title="Business Name" id="name" onChange={onChange} value={name} />
      <ProfileInput title="Phone Number" phone id="phone" onChange={onChange} value={phone} />
      <ProfileInput title="Website" id="website" onChange={onChange} value={website} />
      <ProfileInput title="Email" id="email" onChange={onChange} value={email} />
      <ProfileInput title="Change password" id="password" onChange={onChange} value={password} password />
    </div>
  );
};

export default LeftCol;
