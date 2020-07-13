import React from 'react';
import Sticky from 'react-stickynode';

const BusinessHeader = (props) => {
  return (
    <Sticky top="#business-header">
      <div id="business-header">
        <h1 style={{ color: 'red' }}>Sticky element</h1>
      </div>
    </Sticky>
  );
};

export default BusinessHeader;
