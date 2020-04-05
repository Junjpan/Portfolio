import React from 'react';
import { Link } from 'react-router-dom';
import CommonBtn from './CommonBtn';

function HomeBtn() {
  return (
    <Link to="/">
      <CommonBtn name="HOME" />
    </Link>
  );
}

export default HomeBtn;
