import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 1000;
  width: 100% 
  height:100%
  
`;

const NewsModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <button onClick={onClose}>Close</button>
      {content}
    </ModalWrapper>
  );
};

export default NewsModal;
