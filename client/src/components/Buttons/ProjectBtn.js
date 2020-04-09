import React from 'react';
import { Link } from 'react-router-dom';
import CommonBtn from './CommonBtn';

function ProjectBtn() {
  return (
    <Link to="/projects">
      <CommonBtn name="MY WORK" />
    </Link>
  );
}

export default ProjectBtn;
