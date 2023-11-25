import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LogInput = ({ label, type, placeholder, value, onChange }) => {
  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      <InputField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputWrapper>
  );
};

export default LogInput;