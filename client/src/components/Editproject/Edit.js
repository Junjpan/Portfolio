/* eslint-disable no-undef */
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

  const deleteproject = () => {
    if (editIndex !== 'undefined') {
      // eslint-disable-next-line no-alert
      const confirm = window.confirm('Are you sure you want to delete this project?');
      if (confirm === true) {
        const projectId = projectArray[editIndex]._id;
        axios
          .delete(`/api/projects/delete/${projectId}`, {
            headers: { authentication: `Bearer ${localStorage.token}` },
          })
          .then(res => setMessage(res.data.message))
          .catch(err => setMessage(err.response.data.message));
      }
    }
  };

  const editProject = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('editFullImages', fullscreen);
    formData.append('editMobileImages', smallscreen);
    formData.append('projectName', projectName);
    formData.append('technologies', technologies);
    formData.append('description', description);
    formData.append('demoLink', demoLink);
    formData.append('githubLink', githubLink);

    const projectId = projectArray[editIndex]._id;

    setMessage('Uploading the changes...');
    axios
      .patch(`/api/projects/edit/${projectId}`, formData, {
        'Content-Type': 'multipart/form-data',
        headers: { authentication: `Bearer ${localStorage.token}` },
      })
      .then(res => {
        setMessage(res.data.message);
        document.getElementById('editProjectForm').reset();
      })
      .catch(err => {
        setMessage(err.response.data.message);
      });
  };

  const reader = new FileReader();

  const uploadFullImage = e => {
    // the files info is stored in the array
    setFullScreen(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
  };

  const uploadMobileImage = e => {
    setSmallScreen(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setPreviewSmallURL(reader.result);
    };
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
            id="editProjectForm"
            style={{ width: '80%', height: '110vh', paddingTop: '20px' }}
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
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <button type="submit" className="generalBTN">
                  Edit a Project
                </button>
                <button type="button" className="generalBTN" onClick={deleteproject}>
                  Delete a Project
                </button>
              </div>
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
