import React from 'react';
import PaymentEntry from '@components/confirm/payment-entry';
import PropTypes from 'prop-types';
import PinkButton from '@components/pink-button';
import Modal from '../modal';

const EditModal = ({
  values, setters, close, modalShown, loading, error, updatePaymentInfo, disabled,
}) => {
  return (
    <Modal title="Edit your payment details" modalShown={modalShown} close={close} error={error}>
      <PaymentEntry values={values} setters={setters} />

      <div className="buttons">
        <PinkButton
          style={{ fontSize: '16px' }}
          loading={loading}
          disabled={loading || disabled}
          onClick={updatePaymentInfo}
          loaderHeight={15}
        >Save
        </PinkButton>
      </div>
    </Modal>
  );
};

EditModal.propTypes = {
  values: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    stateCode: PropTypes.object,
    useBusinessAddress: PropTypes.bool,
  }).isRequired,
  setters: PropTypes.shape({
    setAddress: PropTypes.func,
    setCity: PropTypes.func,
    setStateCode: PropTypes.func,
    setUseBusinessAddress: PropTypes.func,
  }).isRequired,
  close: PropTypes.func,
  modalShown: PropTypes.bool,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  updatePaymentInfo: PropTypes.func,
};

export default EditModal;
