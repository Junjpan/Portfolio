import React from 'react';
import logo1 from '../../assets/JunEBug.png';

function Logo() {
  return (
    <div className="logo">
      <div className="logoFrame">
        <img src={logo1} alt="logo1" width="60px" height="60px" />
      </div>
    </div>
  );
}

export default Logo;
