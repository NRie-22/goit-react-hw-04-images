import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  const handleClickEsc = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleClickBackdrop = useCallback(
    e => {
      if (e.currentTarget === e.target) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const handleKeyDown = e => {
      handleClickEsc(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickEsc]);

  return createPortal(
    <Overlay onClick={handleClickBackdrop}>
      <ModalDiv>{children}</ModalDiv>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
