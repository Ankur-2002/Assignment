import React from 'react';
import styled from 'styled-components';
const List = props => {
  return (
    <Div key={props.id}>
      <Text>{props.username}</Text>
      <Text>{props.email}</Text>
      <Text>{props.mobile}</Text>
      <Text>{props.address}</Text>
      <Button
        onClick={() => {
          props.onClick(props.id);
        }}
      >
        Delete
      </Button>
    </Div>
  );
};

export default List;
const Div = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
  background-color: #f5f5f5;
  width: calc(100% - 50px);
`;
const Text = styled.span`
  padding: 5px;
  font-size: 1.2rem;
  font-weight: 600;
`;
const Button = styled.button``;
