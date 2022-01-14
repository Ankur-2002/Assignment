import React from 'react';
import stlyed from 'styled-components';
const Input = props => {
  return (
    <DIV>
      <label htmlFor={props.label}> {props.label}</label>
      <input
        value={props.value}
        type={props.type || 'text'}
        id={props.label}
        placeholder={props.placeholder}
        onChange={props.onchange}
      />
    </DIV>
  );
};

export default Input;
const DIV = stlyed.div`
    padding: 5px; 
    // margin: 0px;
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    // border: 1px solid #ccc;
    align-items: center;    
    label {
        font-size: 1.2rem;
        font-weight: bold;
    }
    input{
        border: 1px solid #ccc;
        outline: none;
        padding : 5px; 
    }
`;
