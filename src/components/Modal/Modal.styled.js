import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalDiv = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

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
