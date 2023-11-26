import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  backdrop-filter: blur(3px);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%; 
  height:100%;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  width: 100%; 
  height:70%;
`;

const NewsModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground>
    <ModalWrapper>
      <button onClick={onClose}>Close</button>
      {content}
    </ModalWrapper>
    </ModalBackground>
  );
};

export default NewsModal;