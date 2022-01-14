import React from 'react';
import styled from 'styled-components';
const Button = props => {
  return <Buttons onClick={props.onClick}>{props.title}</Buttons>;
};

export default Button;
const Buttons = styled.button`
  padding: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 20px;
  font-size: 1rem;
  background-color: #00b4ff;
  color: white;
  outline: none;
  font-weight: bold;
  width: 60%;
`;
