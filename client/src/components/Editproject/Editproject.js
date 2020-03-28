/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';

function Editproject({ setLogin }) {
  const [projectName, setProjectName] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [description, setdescription] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [fullscreen, setFullScreen] = useState('');
  const [smallscreen, setSmallScreen] = useState('');

  const logout = () => {
    setLogin(false);
    // eslint-disable-next-line no-undef
    localStorage.clear();
  };

  const addProject = e => {
    e.preventDefault();
    const projectInfo = {
      projectName,
      technologies,
      description,
      demoLink,
      githubLink,
      fullscreen,
      smallscreen,
    };
    console.log(projectInfo);
  };

  return (
    <div className="Editcontainer">
      <Logo />
      <div className="logout" onClick={logout}>
        Log out
      </div>

      <div style={{ marginTop: '100px' }}>
        <form
          onSubmit={addProject}
          style={{ width: '80%', height: '95vh', paddingTop: '20px' }}
          className="admin_form"
          encType="multipart/form-data"
        >
          <div className="inner_form">
            <label htmlFor="projectName">
              Project Name
              <input
                type="text"
                id="projectName"
                onChange={e => setProjectName(e.target.value)}
                required
              />
            </label>
            <br />
            <label htmlFor="Technologies">
              Technologies
              <input
                type="text"
                id="Technologies"
                onChange={e => setTechnologies(e.target.value)}
                required
              />
            </label>
            <br />
            <label htmlFor="description">
              Description:
              <textarea
                type="text"
                id="description"
                rows={3}
                style={{ resize: 'none' }}
                onChange={e => setdescription(e.target.value)}
                required
              />
            </label>
            <br />
            <label htmlFor="demolink">
              Demo Link:
              <input
                type="text"
                id="demolink"
                onChange={e => setDemoLink(e.target.value)}
                required
              />
            </label>
            <br />
            <label htmlFor="githublink">
              Github Link:
              <input
                type="text"
                id="githublink"
                onChange={e => setGithubLink(e.target.value)}
                required
              />
            </label>
            <br />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <label style={{ width: '300px', marginTop: '30px' }} htmlFor="fullscreen">
                Upload Full Screen Image
                <input
                  type="file"
                  id="fullscreen"
                  accept="image/*"
                  onChange={e => setFullScreen(e.target.value)}
                  required
                />
              </label>
              <br />
              <label style={{ width: '300px', marginTop: '30px' }} htmlFor="smallscreen">
                Upload Mobile Phone Image
                <input
                  type="file"
                  accept="image/*"
                  id="smallscreen"
                  onChange={e => setSmallScreen(e.target.value)}
                />
              </label>
              <br />
            </div>
            <br />
            <br />
            <hr />
            <button type="submit" className="generalBTN">
              Add a Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Editproject.defaultProps = {
  setLogin: false,
};

Editproject.propTypes = {
  setLogin: PropTypes.func,
};

export default Editproject;
