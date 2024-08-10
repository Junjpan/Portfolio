import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuffer, faDashcube, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBraille, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { Event } from './../Tracking/event';

function Project({ name, tech, description, demoLink, github, fullscreen, smallscreen }) {
  return (
    <div className="projectContainer" id={`/${name}`}>
      <h2 className="projectName" style={{ textAlign: 'center' }}>
        <FontAwesomeIcon icon={faBraille} className="icon" />
        {name}
      </h2>
      <div className="normalfont">
        <FontAwesomeIcon icon={faDashcube} className="icon" />
        {description}
      </div>
      <div className="projectimage">
        <div>
          <div className="fullscreen_container">
            <img src={fullscreen} alt={name} className="fullscreen screen" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="linkBTN"
              onClick={() => Event('Projects', `View ${name} source code`, `${name} source code`)}
            >
              <a href={github} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} className="icon" />
                Source Code
              </a>
            </button>
            <button
              type="button"
              className="linkBTN"
              onClick={() => Event('Projects', `View ${name} Live View`, `${name} Live View`)}
            >
              <a href={demoLink} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLaptop} className="icon" />
                Live View
              </a>
            </button>
          </div>
        </div>
        {smallscreen !== '' ? (
          <img src={smallscreen} alt={name} className="smallscreen screen" />
        ) : null}
      </div>
      <div className="normalfont">
        <FontAwesomeIcon icon={faBuffer} className="icon" />
        {tech}
      </div>
    </div>
  );
}

Project.defaultProps = {
  name: '',
  tech: '',
  description: '',
  demoLink: '',
  github: '',
  fullscreen: '',
  smallscreen: '',
};

Project.propTypes = {
  name: PropTypes.string,
  tech: PropTypes.string,
  description: PropTypes.string,
  demoLink: PropTypes.string,
  github: PropTypes.string,
  fullscreen: PropTypes.string,
  smallscreen: PropTypes.string,
};

export default Project;
