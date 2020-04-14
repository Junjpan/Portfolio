import React from 'react';
import { Link } from 'react-router-dom';
import CommonBtn from './CommonBtn';

function HomeBtn() {
  return (
    <Link to="/">
      <CommonBtn name="ABOUT ME" />
    </Link>
  );
}

export default HomeBtn;
