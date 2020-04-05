import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeBtn from '../Buttons/HomeBtn';
import Message from '../Message/Message';
import Project from './Project';
import Loading from '../Buttons/Loading';
import Sidebar from './Sidebar';

function Projects() {
  const [projects, setAllProjects] = useState([]);
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    axios
      .get('api/projects/all')
      .then(res => {
        console.log(res.data.projects);
        setAllProjects(res.data.projects);
        setMounted(true);
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => setMessage('Something went wrong with server...'));
  }, []);

  return (
    <div className="Projects_container">
      <Message message={message} />
      <div className="title">PROJECTS DISPLAY</div>
      <div style={{ height: '60px', width: '100%' }} />
      {mounted ? (
        <div>
          <Sidebar projects={projects} />
          <div className="allprojects">
            {projects.map(project => {
              return (
                <Project
                  key={project._id}
                  name={project.projectName}
                  tech={project.technologies}
                  description={project.description}
                  demoLink={project.demoLink}
                  github={project.githubLink}
                  fullscreen={project.fullscreenlink}
                  smallscreen={project.smallscreenlink}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <HomeBtn />
    </div>
  );
}

export default Projects;
