/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';
import GeneralBtn from '../Buttons/GeneralBtn';

function Editproject({ setLogin }) {
  const logout = () => {
    setLogin(false);
    // eslint-disable-next-line no-undef
    localStorage.clear();
  };

  return (
    <div className="Editcontainer">
      <Logo />
      <div className="logout" onClick={logout}>
        Log out
      </div>
      <div style={{ marginTop: '100px' }}>
        <GeneralBtn buttonName="Add a Project" />
      </div>
    </div>
  );
}

Editproject.defaultProps = {
  setLogin: false,
};

Editproject.propTypes = {
  setLogin: PropTypes.func,
};

export default Editproject;
