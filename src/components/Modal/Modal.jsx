import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled';

const Modal = ({ children, onClose }) => {
  const handleClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleClickEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleClickEsc);
    return () => {
      window.removeEventListener('keydown', handleClickEsc);
    };
  }, [onClose]);

  return createPortal(
    <Overlay onClick={handleClickBackdrop}>
      <ModalDiv>{children}</ModalDiv>
    </Overlay>,
    document.querySelector('#modal-root')
  );
};

export default Modal;
