/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import useDelay from '@utils/useDelay';

const Modal = ({
  modalShown, close, error, children, title,
}) => {
  const [modalDisplay, setModalDisplay, modalDisplayDelayed] = useDelay(modalShown);

  useEffect(() => {
    setModalDisplay(modalShown);
  }, [modalShown]);

  if (!modalDisplayDelayed) return null;

  return (
    <>
      <div className={`backdrop ${modalShown ? 'fade-in-partial' : 'fade-out-partial'}`} />
      <div className={`modal ${modalShown ? 'fade-in' : 'fade-out'}`}>
        <div className="title">{title}</div>
        <div className="error">{error}</div>

        <button type="button" className="button-text modal-close" onClick={close}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {children}
      </div>
    </>
  );
};

Modal.propTypes = {
  modalShown: PropTypes.bool,
  close: PropTypes.func,
  error: PropTypes.string,
  title: PropTypes.string,
};

export default Modal;
