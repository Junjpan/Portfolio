import React, { useState, useEffect } from 'react';
import { Spring } from 'react-spring/renderprops';
import { useTransition, animated } from 'react-spring';
import profileImage from '../../assets/default.jpeg';

function Profile() {
  const [newArray, setNewArray] = useState([
    { key: 1, name: 'Github', link: 'https://github.com/Junjpan' },
  ]);

  function Animation(items) {
    const transitions = useTransition(items, item => item.key, {
      from: { transform: 'translate3d(0,-200px,0)' },
      enter: { transform: 'translate3d(0,0px,0)' },
      config: { duration: 1500 },
    });

    return transitions.map(({ item, key, props }) => {
      return (
        <animated.p key={key} style={{ color: 'black', fontSize: '1.5rem', ...props }}>
          {item.name}
          {' : '}
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.link}
          </a>
        </animated.p>
      );
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setNewArray([
        ...newArray,
        { key: 2, name: 'Linkedin', link: 'https://www.linkedin.com/in/j-pan-b5b07a155/' },
      ]);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNewArray([...newArray, { key: 3, name: 'CodePen', link: 'https://codepen.io/merrypjj' }]);
    }, 5000);
  }, []);

  return (
    <div className="profile">
      <div>
        <h1>
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ duration: 1000 }}>
            {props => <b style={props}> Hi, I'm Junjun. </b>}
          </Spring>
          <br />
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ delay: 1000, duration: 1500 }}
          >
            {props => <b style={props}> You can call me June.</b>}
          </Spring>
          <br />
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ delay: 2500, duration: 1500 }}
          >
            {props => (
              <b style={props}>
                I'm a
                <Spring
                  from={{ color: 'black' }}
                  to={{ color: 'rgb(8,74,135)' }}
                  config={{ delay: 5500, duration: 1500 }}
                >
                  {prop => <span style={prop}> Frontend Developer/Full Stack Developer</span>}
                </Spring>
              </b>
            )}
          </Spring>
          <br />
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ delay: 4000, duration: 1500 }}
          >
            {props => <b style={props}> currenttly living in Orange County, CA .</b>}
          </Spring>
        </h1>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 5500, duration: 1500 }}>
          {props => (
            <p style={{ color: 'black', fontSize: '1.5rem', ...props }}>
              {' '}
              Contact: merrypjj@yahoo.com
            </p>
          )}
        </Spring>
        {Animation(newArray)}
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
