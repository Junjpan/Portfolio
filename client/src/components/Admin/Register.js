/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

function Register({ setRegister }) {
  return (
    <div>
      <form className="admin_form">
        <div className="inner_form">
          <h2>Register as Admin</h2>
          <label htmlFor="username">Username:</label>
          <br />
          <input name="username" id="username" type="text" pattern=".{6,}" required />
          <br />
          <label htmlFor="password">Pawwrod:</label>
          <br />
          <input name="password" id="password" type="password" pattern=".{6,12}" required />
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
