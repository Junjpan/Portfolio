import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import ProjectBtn from '../Buttons/ProjectBtn';
import AboutmeBtn from '../Buttons/AboutmeBtn';
import Technicals from './Technicals';

function Resources() {
  return (
    <div className="resources_Container">
      <div className="res_title">
        RESOURCES
        <FontAwesomeIcon icon={faPaw} style={{ color: '#08fdd8' }} />
        <p style={{ fontSize: '1.2rem' }}>collected from everywhere</p>
      </div>
      <Technicals />
      <ProjectBtn />
      <AboutmeBtn />
    </div>
  );
}

export default Resources;
