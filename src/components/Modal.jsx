import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.35);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  padding: 2.25rem;
  width: clamp(640px, 80vw, 960px);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    max-height: none;
    border-radius: 0;
    padding: 1.25rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.75rem;
  color: #F27D70;
  cursor: pointer;
`;

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ModalBox>
    </Overlay>
  );
}
