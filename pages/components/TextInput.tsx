import React, { useState } from 'react';
import styled from 'styled-components';

type InputProps = {
  width: string;
};

const Input = styled.input<InputProps>`
  display: flex;
  width: ${(props) => props.width};
  padding: 8px;
  text-align: left;
  background: ${(props) => props.theme.inputBackground};
  color: white;
  border: ${(props) => props.theme.inputBorder};
  padding: 8px 24px;
  border-radius: 8px;
  font-size: 16px;
  resize: none;
  :focus {
    outline: ${(props) => props.theme.focusOutline};
  }
  ::placeholder {
    color: white;
    opacity: 0.5;
  }
`;

type TextInputProps = {
  value: string;
  maxCharacters: number;
  placeholder?: string;
  width?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({
  value,
  width,
  onChange,
  maxCharacters,
  placeholder,
}: TextInputProps) => {
  return (
    <Input
      value={value}
      type='text'
      width={width || 'auto'}
      onChange={onChange}
      maxLength={maxCharacters}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
