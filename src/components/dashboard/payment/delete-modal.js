import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';

const DeleteModal = ({
  modalShown, close, error, loading, deletePaymentInfo,
}) => {
  return (
    <Modal title="Delete your credit card" modalShown={modalShown} close={close} error={error}>
      <h6>Are you sure you want to delete your credit card? You will be removed from the BobaMe platform at the end of this billing cycle.</h6>

      <div className="buttons">
        <button
          style={{ fontSize: '16px', backgroundColor: 'red' }}
          className="default-button"
          disabled={loading}
          onClick={deletePaymentInfo}
          type="button"
        >Delete
        </button>
      </div>
    </Modal>
  );
};

DeleteModal.propTypes = {
  close: PropTypes.func,
  modalShown: PropTypes.bool,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  deletePaymentInfo: PropTypes.func,
};

export default DeleteModal;
