import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import Profile from './components/Profile/Profile';
import Introduction from './components/Introduction/Introduction';
import ProjectBtn from './components/Buttons/ProjectBtn';
import Admin from './components/Admin/Admin';
import Projects from './components/Projects/Projects';

function App() {
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
                <ProjectBtn />
              </div>
            );
          }}
        />
        <Route path="/projects" exact component={Projects} />
        <Route path="/admin" exact component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
