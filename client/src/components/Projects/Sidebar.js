/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ projects }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      {showSidebar ? (
        <span className="closeBTN" onClick={() => setShowSidebar(false)}>
          <FontAwesomeIcon icon={faTimesCircle} size="2x" />
        </span>
      ) : (
        <span className="burgerBTN" onClick={() => setShowSidebar(true)}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </span>
      )}
      <div className={showSidebar ? 'show' : 'sidebar_container'}>
        {projects.map(project => {
          return (
            <div key={project._id} className="sidebar_image_container">
              <a
                href={`#${project.projectName}`}
                onClick={() => {
                  if (showSidebar) {
                    setShowSidebar(false);
                  }
                }}
              >
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
