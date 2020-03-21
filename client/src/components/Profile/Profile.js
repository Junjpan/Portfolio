import React from 'react';
import profileImage from '../../assets/default.jpeg';

function Profile() {
    return (
      <div className="profile">
        <h2>JunJun Pan</h2>
        <div><img src={profileImage} alt="profile" width="200px" height="300px" /></div>
      </div>
    )
}

export default Profile;
