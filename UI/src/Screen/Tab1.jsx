import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Component/Button';
import Input from '../Component/Input';
import List from '../Component/List';

const isEmail = props => {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(props.email) === true ? true : false;
};
const isMobile = props => {
  var regex = /^\d{10}$/;
  return regex.test(props.mobile) === true ? true : false;
};
const Tab1 = ({ setToken, Token }) => {
  const [Entries, setEntries] = useState([]);
  const [Email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const Post = async () => {
    const data = await fetch('http://localhost:4000/api/post/entry', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    });
    if (data.status !== 200) {
      Cookies.remove('Token');
      setToken(null);
    }
    const json = await data.json();

    setEntries(json.entries);
  };

  useEffect(() => {
    Post();
  }, []);

  const Submit = async () => {
    console.log(username);
    if (isEmail(Email)) {
      return window.alert('Please enter valid email');
    }
    if (isMobile(mobile)) {
      return window.alert('Please enter valid mobile number');
    }
    if (username.trim().length < 3) {
      return window.alert('Please enter valid username');
    }
    if (address.trim().length < 4) {
      return window.alert('Please enter valid address');
    }
    const Object = {
      email: Email,
      username: username,
      address: address,
      mobile: mobile,
    };
    const data = await fetch('http://localhost:4000/api/post/entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(Object),
    });
    if (data.status === 401) {
      Cookies.remove('Token');
      setToken(null);
      return;
    }
    const json = await data.json();
    console.log(json);
    const NewEntries = Entries;
    const post = NewEntries.concat(json.post);
    setEntries(post);
  };
  const Delete = async id => {
    const data = await fetch(`http://localhost:4000/api/post/entry?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    });
    if (data.status === 401) {
      Cookies.remove('Token');
      setToken(null);
      return window.alert('Something went wrong');
    } else {
      const json = await data.json();
      const NewEntries = Entries;

      setEntries(NewEntries.filter(items => items._id !== id));
    }
  };
  const [tab, setTab] = useState(1);
  return (
    <>
      <Header>
        <span
          onClick={() => {
            setTab(1);
          }}
          style={{
            color: tab === 1 ? '#00b4ff' : '#000',
          }}
        >
          Entries
        </span>
        <span
          onClick={() => {
            setTab(0);
          }}
          style={{
            color: tab === 0 ? '#00b4ff' : '#000',
          }}
        >
          User
        </span>
      </Header>
      {tab ? (
        <Wrapper>
          <Text>Enter user's details</Text>
          <FormPart>
            <Input
              label="Username"
              placeholder={'UserName'}
              onchange={e => {
                setUsername(e.target.value);
              }}
            />
            <Input
              label="Email"
              placeholder={'Email'}
              onchange={e => {
                setEmail(e.target.value);
              }}
            />
            <Input
              label="Address"
              placeholder={'Address'}
              onchange={e => {
                setAddress(e.target.value);
              }}
            />
            <Input
              label="Mobile no"
              placeholder={'mobile number'}
              type={'Number'}
              onchange={e => {
                setMobile(e.target.value);
              }}
            />

            <Button title="Submit" onClick={Submit} />
          </FormPart>
        </Wrapper>
      ) : (
        <Wrapper>
          <Text>Records</Text>
          {Entries.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr .5fr',
                width: 'calc(100% - 50px)',

                textAlign: 'center',
              }}
            >
              <h3>Name</h3>
              <h3>Email</h3>
              <h3>Mobile</h3>
              <h3>Address</h3>
            </div>
          )}
          {
            (console.log(Entries),
            Entries?.map(({ _id, username, email, address, mobile }, index) => {
              return (
                <List
                  key={index}
                  username={username}
                  email={email}
                  address={address}
                  mobile={mobile}
                  id={_id}
                  onClick={Delete}
                />
              );
            }))
            // console.log(Entries)
          }
        </Wrapper>
      )}
    </>
  );
};
export default Tab1;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Text = styled.h3`
  word-spacing: 1px;
  font-size: 1.5rem;
  padding-bottom: 7px;
  width: 20%;
  border-bottom: 2px solid red;
`;
const FormPart = styled.div`
  border: 1px solid #ccc;
  padding: 50px;
  width: 400px;
  border-radius: 5px;
  background-color: #ddd;
  shadow-color: #ccc;
  box-shadow: 0px 0px 10px #ccc;

  Button {
    padding: 10px;
    margin-top: 10px;
  }
  Input {
    padding: 7px;
  }
`;
const Header = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  span {
    padding: 10px;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
  }
`;
