import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Logo from '../Logo/Logo';

function Admin() {
  const [register, setRegister] = useState(false);

  return (
    <div className="formcontainer">
      <Logo />
      {register ? <Register setRegister={setRegister} /> : <Login setRegister={setRegister} />}
    </div>
  );
}

export default Admin;
