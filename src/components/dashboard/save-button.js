import React from 'react';
import PinkButton from '@components/pink-button';
import dashboardStyles from '@styles/dashboard.module.scss';
import useWindowSize from '@utils/useWindowSize';
import Loading from '../lottie/loading';

const SaveButton = ({
  save, isSaving, error, enabled,
}) => {
  const { width } = useWindowSize();
  return (
    <div className={dashboardStyles.save}>
      {isSaving
      && (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div>Saving...</div>
          <Loading width="80px" height="80px" style={{ marginLeft: '-10px' }} />
        </div>
      )}
      {error && error.length > 0 && <div style={{ color: 'red' }}>{error}</div>}
      <PinkButton
        style={width <= 960 ? { fontSize: '18px', marginLeft: '15px' } : { fontSize: '24px', marginLeft: '15px' }}
        onClick={() => { save(); }}
        disabled={isSaving || !enabled}
      >Save
      </PinkButton>
    </div>
  );
};

export default SaveButton;
