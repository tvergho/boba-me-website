import React from 'react';
import Input from 'react-phone-number-input/input';
import confirmStyles from '../../styles/confirm.module.scss';
import PhotoUpload from './photo-upload';

const RightCol = ({
  phone, setPhone, setError, setIsUploading, filenames, setFilenames, website, setWebsite,
}) => {
  return (
    <div className={confirmStyles.col}>
      <Input placeholder="Phone Number" value={phone} onChange={(val) => { setPhone(val); }} country="US" />
      <input placeholder="Website" name="website" id="website" value={website} onChange={(e) => { setWebsite(e.target.value); }} />
      <PhotoUpload setError={setError} setIsUploading={setIsUploading} filenames={filenames} setFilenames={setFilenames} />
    </div>
  );
};

export default RightCol;
