import React from 'react';
import PropTypes from 'prop-types';

function Sidebar({ projects }) {
  console.log(projects);
  return (
    <div className="sidebar_container">
      {projects.map(project => {
        return (
          <div key={project._id} className="sidebar_image_container">
            <a href={`#${project.projectName}`}>
              <img
                src={project.fullscreenlink}
                width="260px"
                height="131px"
                className="mini_image"
                alt={project.projectName}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
}

Sidebar.defaultProps = {
  projects: [],
};

Sidebar.propTypes = {
  projects: PropTypes.instanceOf(Object),
};

export default Sidebar;
