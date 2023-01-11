import React from 'react';
import styled from 'styled-components';

type StyledButtonProps = {
  width: string;
};

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: none;
  padding: 8px;
  cursor: pointer;
  background: ${(props) => props.theme.buttonBackground};
  width: ${(props) => props.width};
  transition: transform 150ms ease-in-out;
  font-size: 20px;

  i {
    font-size: 20px;
  }

  :focus {
    outline: ${(props) => props.theme.focusOutline};
  }

  :hover {
  }

  :active {
    transform: scale(0.98);
  }
`;

type ButtonProps = {
  children: React.ReactNode;
  width?: string;
  onClick: () => void;
};

const Button = ({ children, onClick, width }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} width={width || 'auto'}>
      {children}
    </StyledButton>
  );
};

export default Button;
