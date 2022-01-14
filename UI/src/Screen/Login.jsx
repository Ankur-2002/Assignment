import React, { useState } from 'react';
import Input from '../Component/Input';
import styled from 'styled-components';
import Button from '../Component/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
const Login = ({ setToken }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const Submit = async () => {
    const Object = {
      email: Email,
      password: Password,
    };
    const data = await axios.post(
      'http://localhost:4000/api/auth/login',
      Object
    );
    console.log(data);
    const { token } = data.data;
    if (token) {
      Cookies.set('Token', token);
      setToken(token);
    } else {
      window.alert('Login Failed');
    }
  };
  return (
    <Wrapper>
      <Text>Login Screen </Text>
      <Div>
        <Input
          label="Email"
          type="email"
          placeholder={'Enter your email'}
          onchange={e => {
            setEmail(e.target.value);
          }}
        />
        <Input
          label="Password"
          type="password"
          placeholder={'Enter your password'}
          onchange={e => {
            setPassword(e.target.value);
          }}
        />
        <Button title={'Login'} onClick={Submit}></Button>
      </Div>
    </Wrapper>
  );
};

export default Login;
const Wrapper = styled.div`
  border: 1px solid #ccc;
  height: 99vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const Div = styled.div`
  border: 1px solid #ccc;
  padding: 30px;
  border-radius: 5px;
  width: 300px;
  Button {
    margin-top: 10px;
  }
`;
const Text = styled.h3``;
