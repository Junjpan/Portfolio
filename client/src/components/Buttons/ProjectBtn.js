import React from 'react';
import { Link } from 'react-router-dom';

function ProjectBtn() {
  return (
    <Link to="/projects">
      <div className="project_btn">
        Discover
        <div className="outer_circle">
          <div className="inner_circle" />
        </div>
      </div>
    </Link>
  );
}

export default ProjectBtn;
