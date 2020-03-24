import React from 'react';
import Logo from './components/Logo/Logo';
import Profile from './components/Profile/Profile';
import Introduction from './components/Introduction/Introduction';
import ProjectBtn from './components/Buttons/ProjectBtn';

function App() {
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
}

export default App;
