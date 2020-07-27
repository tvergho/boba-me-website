import React from 'react';
import PhotoUpload from '@components/confirm/photo-upload';
import ProfileInput from './profile-input';

const RightCol = ({
  onChange, values, setIsUploading, setError, filenames, setFilenames,
}) => {
  const {
    address, city, state, zip,
  } = values;
  return (
    <div>
      <ProfileInput title="Street Address" id="address" onChange={onChange} value={address} />
      <ProfileInput title="City" id="city" onChange={onChange} value={city} />
      <ProfileInput title="State" state id="state" onChange={onChange} value={state} />
      <ProfileInput title="Zip" id="zip" onChange={onChange} value={zip} />
      <PhotoUpload
        setIsUploading={setIsUploading}
        setError={setError}
        filenames={filenames}
        setFilenames={setFilenames}
        text={<p>Drag additional business <span style={{ fontWeight: 500 }}>photos</span> here.</p>}
      />
    </div>
  );
};

export default RightCol;
