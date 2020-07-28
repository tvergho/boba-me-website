import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PinkButton from '@components/pink-button';
import ProfileInput from './profile-input';

const PasswordModal = ({
  modalShown, password, setPassword, close, error, submit, modalLoading,
}) => {
  return (
    <>
      <div className={`backdrop ${modalShown ? 'fade-in-partial' : 'fade-out-partial'}`} />
      <div className={`modal ${modalShown ? 'fade-in' : 'fade-out'}`}>
        <div className="title">Enter your original password again for security.</div>
        <div className="error">{error}</div>

        <button type="button" className="button-text modal-close" onClick={close}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <ProfileInput title="Password" id="password" password value={password} onChange={setPassword} />

        <div style={{ flexDirection: 'row', justifyContent: 'flex-end', display: 'flex' }}>
          <PinkButton style={{ fontSize: '16px' }} onClick={submit} disabled={modalLoading}>Submit</PinkButton>
        </div>
      </div>
    </>
  );
};

export default PasswordModal;
