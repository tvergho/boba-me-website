/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

const API_URL = 'https://api.bobame.app';

const PhotoUpload = ({
  setError, setIsUploading, filenames, setFilenames, text, style, isUploading,
}) => {
  const {
    getRootProps, getInputProps, open, acceptedFiles,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: 'image/*',
  });

  // Automatically start uploading once files are added.
  useEffect(() => {
    console.log(acceptedFiles);
    if (acceptedFiles.length > 0) {
      setFilenames([]);
      upload();
    }
  }, [acceptedFiles]);

  // Mark an upload as complete.
  useEffect(() => {
    if (filenames.length === acceptedFiles.length && filenames.length > 0 && !filenames.includes(undefined) && !filenames.includes(null)) {
      setIsUploading(false);
    }
  }, [filenames, acceptedFiles]);

  async function getUploadUrls() {
    const extensions = [];
    const fileTypes = [];
    for (const file of acceptedFiles) {
      const fileType = file.type;
      const split = file.name.split('.');
      const extension = split[split.length - 1];

      extensions.push(extension);
      fileTypes.push(fileType);
    }

    const options = {
      method: 'post',
      url: `${API_URL}/business/uploadurl`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        fileTypes,
        extensions,
      },
    };

    try {
      const response = await axios(options);
      return response.data;
    } catch (e) {
      console.log(e);
      setError('There was an error uploading your photos.');
      setIsUploading(false);
      return null;
    }
  }

  const sendToS3 = (uploadURLs, acceptedFilenames) => {
    for (let i = 0; i < acceptedFiles.length; i += 1) {
      const reader = new FileReader();

      reader.onload = () => {
        const options = {
          method: 'put',
          url: uploadURLs[i],
          data: reader.result,
          headers: {
            'Content-Type': acceptedFiles[i].type,
            'x-amz-acl': 'public-read',
          },
        };

        axios(options)
          .then(() => {
            setFilenames((names) => {
              const newNames = [...names];
              newNames[i] = acceptedFilenames[i];
              return newNames;
            });
          });
      };
      reader.readAsArrayBuffer(acceptedFiles[i]);
    }
  };

  async function upload() {
    setIsUploading(true);
    setFilenames([]);

    try {
      const toUpload = await getUploadUrls();

      if (toUpload?.uploadURLs && toUpload.uploadURLs.length === acceptedFiles.length) {
        const { uploadURLs, acceptedFilenames } = toUpload;
        sendToS3(uploadURLs, acceptedFilenames);
      }
    } catch (e) {
      setError('There was an error uploading your photos.');
      setIsUploading(false);
    }
  }

  return (
    <div {...getRootProps({ className: 'dropzone', style })}>
      <input {...getInputProps()} />
      {text || <p>Drag your business <span style={{ fontWeight: 500 }}>photos</span> here.</p>}

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button type="button" onClick={open} disabled={isUploading}>
          Click to Upload
        </button>
        <Loader type="Oval" color="#FFB7B2" height={35} style={isUploading ? {} : { display: 'none' }} />
      </div>

      <ul>
        {acceptedFiles.map((file) => {
          return <li key={file.name}>{file.name}</li>;
        })}
      </ul>
    </div>
  );
};

PhotoUpload.propTypes = {
  setError: PropTypes.func.isRequired,
  setIsUploading: PropTypes.func.isRequired,
  filenames: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilenames: PropTypes.func.isRequired,
  text: PropTypes.object,
  style: PropTypes.object,
  isUploading: PropTypes.bool,
};

export default PhotoUpload;
