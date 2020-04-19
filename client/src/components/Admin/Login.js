/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Message from '../Message/Message';

function Login({ setRegister, setLogin }) {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submitLogin = e => {
    e.preventDefault();
    const userinfo = { username, password };
    axios
      .post('/api/user/login', userinfo)
      .then(res => {
        // eslint-disable-next-line no-undef
        localStorage.setItem('token', res.data.token);
        setLogin(true);
      })
      .catch(err => {
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
          <label htmlFor="password">Password:</label>
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
  setLogin: false,
};

Login.propTypes = {
  setRegister: PropTypes.func,
  setLogin: PropTypes.func,
};

export default Login;
