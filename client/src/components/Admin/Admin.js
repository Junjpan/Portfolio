import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Register from './Register';
import Logo from '../Logo/Logo';

function Admin({ setLogin }) {
  const [register, setRegister] = useState(false);

  return (
    <div className="formcontainer">
      <Logo />
      {register ? (
        <Register setRegister={setRegister} />
      ) : (
        <Login setRegister={setRegister} setLogin={setLogin} />
      )}
    </div>
  );
}

Admin.defaultProps = {
  setLogin: false,
};

Admin.propTypes = {
  setLogin: PropTypes.func,
};

export default Admin;
