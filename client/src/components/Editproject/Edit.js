import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Message from '../Message/Message';
import ProjectOption from './ProjectOption';

function Edit({ setEdit }) {
  const [projectName, setProjectName] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [description, setdescription] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [fullscreen, setFullScreen] = useState('');
  const [smallscreen, setSmallScreen] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [previewSmall, setPreviewSmallURL] = useState('');
  const [projectArray, setProjectArray] = useState([]);
  const [editIndex, setEditProjectIndex] = useState();
  const [message, setMessage] = useState('');
  const [projectNamesArray, setProjectNamesArray] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const result = await axios.get('/api/projects/all');
      try {
        setProjectArray(result.data.projects);
        const namesArray = result.data.projects.map(project => {
          return project.projectName;
        });
        setProjectNamesArray(namesArray);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (projectArray.length !== 0 && editIndex !== 'undefined') {
      const current = projectArray[editIndex];
      setProjectName(current.projectName);
      setTechnologies(current.technologies);
      setdescription(current.description);
      setDemoLink(current.demoLink);
      setGithubLink(current.githubLink);
    }
  }, [editIndex]);

  const editProject = e => {
    e.preventDefault();
    console.log('edit');
  };

  const uploadFullImage = () => {
    console.log('uploadFullImage');
  };

  const uploadMobileImage = () => {
    console.log('uploadmobileimage');
  };

  return (
    <div className="Editcontainer">
      <Message message={message} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ProjectOption
          projectNamesArray={projectNamesArray}
          setEditProjectIndex={setEditProjectIndex}
        />
        <div>
          <form
            onSubmit={editProject}
            id="addProjectForm"
            style={{ width: '80%', height: '100vh', paddingTop: '20px' }}
            className="admin_form"
          >
            <FontAwesomeIcon
              icon={faWindowClose}
              size="2x"
              style={{ marginLeft: '10px' }}
              onClick={() => setEdit(false)}
            />
            <div className="inner_form">
              <label htmlFor="projectName">
                Project Name
                <input
                  value={projectName}
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
                  value={technologies}
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
                  value={description}
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
                  value={demoLink}
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
                  value={githubLink}
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
                      <img src={previewURL} alt="fullscreen_preview" className="preview1" />
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
                      <img src={previewSmall} alt="mobile_preview" className="preview2" />
                    )}
                  </div>
                </div>
              </div>
              <hr />
              <button type="submit" className="generalBTN">
                Edit a Project
              </button>
            </div>
          </form>
        </div>
      </div>
      )
    </div>
  );
}

Edit.defaultProps = {
  setEdit: false,
};

Edit.propTypes = {
  setEdit: PropTypes.func,
};

export default Edit;
