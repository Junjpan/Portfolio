import React from 'react';
import { Spring } from 'react-spring/renderprops';
import profileImage from '../../assets/default.jpeg';

function Profile() {
  return (
    <div className="profile">
      <div>
        <h1>
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ duration: 1000 }}>
            {props => <bold style={props}> Hi, I'm Junjun. </bold>}
          </Spring>
          <br />
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ delay: 1000, duration: 1500 }}
          >
            {props => <bold style={props}> You can call me June.</bold>}
          </Spring>
          <br />
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ delay: 2500, duration: 1500 }}
          >
            {props => (
              <bold style={props}>
                I'm a
                <Spring
                  from={{ color: 'black' }}
                  to={{ color: 'rgb(8,74,135)' }}
                  config={{ delay: 5500, duration: 1500 }}
                >
                  {prop => <span style={prop}> Frontend Developer/Full Stack Developer</span>}
                </Spring>
              </bold>
            )}
          </Spring>
          <br />
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ delay: 4000, duration: 1500 }}
          >
            {props => <bold style={props}> currenttly living in Orange County, CA .</bold>}
          </Spring>
        </h1>

        <h4>
          <a href="https://www.linkedin.com/in/j-pan-b5b07a155/">Linkedin Profile</a>
        </h4>
      </div>
      <div>
        <img
          className="profile_image"
          src={profileImage}
          alt="profile"
          width="225px"
          height="350px"
        />
      </div>
    </div>
  );
}

export default Profile;
