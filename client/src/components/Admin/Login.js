/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Message from '../Message/Message';

function Login({ setRegister }) {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submitLogin = e => {
    e.preventDefault();
    const userinfo = { username, password };
    console.log(userinfo);
    axios
      .post('/api/user/login', userinfo)
      .then(res => {
        console.log(res);
        setMessage(res.data.message);
      })
      .catch(err => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div>
      <Message message={message} />
      <form className="admin_form" onSubmit={submitLogin}>
        <div className="inner_form">
          <h2>Sign In</h2>
          <label htmlFor="username">Username (case sensitive):</label>
          <br />
          <input
            name="username"
            id="username"
            type="text"
            pattern=".{6,}"
            onChange={e => {
              setUser(e.target.value);
            }}
            required
          />
          <br />
          <label htmlFor="password">Pawwrod:</label>
          <br />
          <input
            name="password"
            id="password"
            type="password"
            pattern=".{6,12}"
            onChange={e => {
              setPassword(e.target.value);
            }}
            required
          />
          <br />
          <hr />
          <button type="submit" className="submit_btn">
            Login
          </button>
          <p className="register_link" onClick={() => setRegister(true)}>
            <b>Register</b>
          </p>
        </div>
      </form>
    </div>
  );
}

Login.defaultProps = {
  setRegister: false,
};

Login.propTypes = {
  setRegister: PropTypes.func,
};

export default Login;
