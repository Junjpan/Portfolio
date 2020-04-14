/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Logo from './components/Logo/Logo';
import Profile from './components/Profile/Profile';
import Introduction from './components/Introduction/Introduction';
import ProjectBtn from './components/Buttons/ProjectBtn';
import EditProject from './components/Editproject/Editproject';
import Admin from './components/Admin/Admin';
import Projects from './components/Projects/Projects';
import Resources from './components/Resources/Resources';
import ResourceBtn from './components/Buttons/ResourceBtn';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:5000';
}

function App() {
  const [login, setLogin] = useState(false);
  const loginstatus = localStorage.token;
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return (
              <div>
                <div className="Appcontainer">
                  <Logo />
                  <Profile />
                  <Introduction />
                </div>
                <ResourceBtn />
                <ProjectBtn />
              </div>
            );
          }}
        />
        <Route path="/projects" exact component={Projects} />
        <Route path="/resources" exact component={Resources} />
        <Route
          path="/admin"
          exact
          render={props => {
            return loginstatus ? (
              <EditProject setLogin={setLogin} />
            ) : (
              <Admin setLogin={setLogin} />
            );
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
