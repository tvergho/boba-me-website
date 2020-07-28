import React, { useState } from 'react';
import PhotoUpload from '@components/confirm/photo-upload';
import Gallery from 'react-grid-gallery';
import ProfileInput from './profile-input';

const RightCol = ({
  onChange, values, isUploading, setIsUploading, setError, filenames, setFilenames, photos, setDefaultImage, deleteImage,
}) => {
  const {
    address, city, state, zip,
  } = values;

  const [current, setCurrent] = useState(0);

  return (
    <div>
      <ProfileInput title="Street Address" id="address" onChange={onChange} value={address} />
      <ProfileInput title="City" id="city" onChange={onChange} value={city} />
      <ProfileInput title="State" state id="state" onChange={onChange} value={state} />
      <ProfileInput title="Zip" id="zip" onChange={onChange} value={zip} />

      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
        <h4>Photos</h4>
        <Gallery
          images={photos.map((photo) => {
            return {
              src: photo,
              thumbnail: photo,
            };
          })}
          currentImageWillChange={(index) => { setCurrent(index); }}
          customControls={[
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <button
                className="lightbox-button"
                type="button"
                onClick={() => {
                  setDefaultImage(current);
                }}
              >Set as Default
              </button>
              <button
                className="lightbox-button"
                type="button"
                onClick={() => {
                  deleteImage(current);
                  setCurrent((cur) => cur - 1);
                }}
              >Delete
              </button>
            </div>,
          ]}
        />
        <PhotoUpload
          setIsUploading={setIsUploading}
          setError={setError}
          filenames={filenames}
          setFilenames={setFilenames}
          text={<p>Drag additional business <span style={{ fontWeight: 500 }}>photos</span> here.</p>}
          isUploading={isUploading}
        />
      </div>
    </div>
  );
};

export default RightCol;
