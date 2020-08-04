import React from 'react';
import Loader from 'react-loader-spinner';

const PageLoader = () => {
  return (
    <div style={{
      width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <Loader type="Oval" color="#FFB7B2" height={150} style={{ margin: 'auto auto' }} />
    </div>
  );
};

export default PageLoader;
