/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Message from '../Message/Message';

function Register({ setRegister }) {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [invitationkey, setInvitationKey] = useState('');

  const submitRegister = e => {
    e.preventDefault();
    const userinfo = { username, password, invitationkey };
    axios
      .post('/api/user/register', userinfo)
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(err => {
        setMessage(err.response.data.message);
      });
  };

  return (
    <div>
      <Message message={message} />
      <form className="admin_form" onSubmit={submitRegister}>
        <div className="inner_form">
          <h2>Register as Admin</h2>
          <label htmlFor="username">Username (case sensitive):</label>
          <br />
          <input
            name="username"
            id="username"
            type="text"
            pattern=".{6,}"
            onChange={e => setUser(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
            required
          />
          <br />
          <label htmlFor="invitationkey">Invitation Key:</label>
          <br />
          <input
            name="invitationkey"
            id="invitationkey"
            type="text"
            onChange={e => setInvitationKey(e.target.value)}
            required
          />
          <br />
          <hr />
          <button type="submit" className="submit_btn">
            Register
          </button>
          <p className="register_link" onClick={() => setRegister(false)}>
            <b>Login</b>
          </p>
        </div>
      </form>
    </div>
  );
}

Register.defaultProps = {
  setRegister: false,
};

Register.propTypes = {
  setRegister: PropTypes.func,
};

export default Register;
