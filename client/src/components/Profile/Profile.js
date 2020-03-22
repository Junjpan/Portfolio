import React from 'react';
import profileImage from '../../assets/profile.jpg';

function Profile() {
  return (
    <div className="profile">
      <div>
        <img src={profileImage} alt="profile" width="200px" height="300px" />
      </div>
      <div>
        <h2> JunJun Pan</h2>
        <h4> Frontend Developer/Full Stack Developer</h4>
        <h4>
          <a href="https://www.linkedin.com/in/j-pan-b5b07a155/">Linkedin Profile</a>
        </h4>
      </div>
    </div>
  );
}

export default Profile;
