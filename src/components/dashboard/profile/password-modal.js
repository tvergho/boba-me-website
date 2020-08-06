import React from 'react';
import PinkButton from '@components/pink-button';
import ProfileInput from './profile-input';
import Modal from '../modal';

const PasswordModal = ({
  modalShown, password, setPassword, close, error, submit, modalLoading,
}) => {
  return (
    <Modal modalShown={modalShown} close={close} error={error} title="Enter your original password again for security.">
      <ProfileInput title="Password" id="password" password value={password} onChange={setPassword} />

      <div style={{ flexDirection: 'row', justifyContent: 'flex-end', display: 'flex' }}>
        <PinkButton style={{ fontSize: '16px' }} onClick={submit} disabled={modalLoading}>Submit</PinkButton>
      </div>
    </Modal>
  );
};

export default PasswordModal;
