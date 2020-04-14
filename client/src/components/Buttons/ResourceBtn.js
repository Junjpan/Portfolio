import React from 'react';
import { Link } from 'react-router-dom';

function ResourceBtn() {
  return (
    <Link to="/resources">
      <div className="resource_btn">RESOURCES</div>
    </Link>
  );
}

export default ResourceBtn;
