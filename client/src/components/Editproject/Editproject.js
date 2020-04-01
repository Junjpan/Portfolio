/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Logo from '../Logo/Logo';
import Message from '../Message/Message';

function Editproject({ setLogin }) {
  const [projectName, setProjectName] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [description, setdescription] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [fullscreen, setFullScreen] = useState('');
  const [smallscreen, setSmallScreen] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [previewSmall, setPreviewSmallURL] = useState('');
  const [message, setMessage] = useState('');

  const logout = () => {
    setLogin(false);
    // eslint-disable-next-line no-undef
    localStorage.clear();
  };

  let reader = new FileReader();

  const uploadFullImage = e => {
    e.preventDefault();
    // receive all the basic information from the file ( name, lastModified, webkitRelativePath,size,type,)
    const file = e.target.files[0];
    setFullScreen(file);

    reader.readAsDataURL(file); // set preview image. readAsDataUrl->image readAsText->documents
    reader.onloadend = () => {
      // reader.result is image's base64
      setPreviewURL(reader.result);
    };
  };

  const uploadMobileImage = e => {
    e.preventDefault();
    const file = e.target.files[0];
    setSmallScreen(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSmallURL(reader.result);
    };
  };

  const addProject = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('projectimages', fullscreen);
    formData.append('projectimages', smallscreen);
    formData.append('projectName', projectName);
    formData.append('technologies', technologies);
    formData.append('description', description);
    formData.append('demoLink', demoLink);
    formData.append('githubLink', githubLink);

    axios
      .post('/api/projects/add', formData, {
        // eslint-disable-next-line no-undef
        headers: {
          'Content-Type': `multipart/form-data`,
          authentication: `Bearer ${localStorage.token}`,
        }, // using the Bearer schema
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        setMessage(err.response.data.message);
      });
  };

  return (
    <div className="Editcontainer">
      <Logo />
      <div className="logout" onClick={logout}>
        Log out
      </div>

      <Message message={message} />

      <div style={{ marginTop: '100px' }}>
        <form
          onSubmit={addProject}
          style={{ width: '80%', height: '100vh', paddingTop: '20px' }}
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
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                <div>
                  <label style={{ width: '300px', marginTop: '30px' }} htmlFor="fullscreen">
                    Project Full Screen Image
                    <input
                      type="file"
                      id="fullscreen"
                      accept="image/*"
                      onChange={uploadFullImage}
                      required
                    />
                  </label>
                </div>
                <div>
                  {previewURL !== '' && (
                    <img src={previewURL} alt="fullscreen_preview" className="preview" />
                  )}
                </div>
              </div>
              <br />

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                <div>
                  <label style={{ width: '300px', marginTop: '30px' }} htmlFor="smallscreen">
                    Project Mobile Screen Image
                    <input
                      type="file"
                      accept="image/*"
                      id="smallscreen"
                      onChange={uploadMobileImage}
                    />
                  </label>
                </div>
                <div>
                  {previewSmall !== '' && (
                    <img src={previewSmall} alt="mobile_preview" className="preview" />
                  )}
                </div>
              </div>
            </div>
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
