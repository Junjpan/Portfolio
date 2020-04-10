/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { Spring } from 'react-spring/renderprops';
import { useTransition, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faCodepen, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import profileImage from '../../assets/default.jpeg';

function Profile() {
  const [newArray, setNewArray] = useState([
    { key: 1, name: 'Github', link: 'https://github.com/Junjpan', icon: faGithubSquare },
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
          <FontAwesomeIcon icon={item.icon} size="1x" style={{ color: 'black' }} /> {item.name}
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
        {
          key: 2,
          name: 'Linkedin',
          link: 'https://www.linkedin.com/in/j-pan-b5b07a155/',
          icon: faLinkedin,
        },
      ]);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNewArray([
        ...newArray,
        { key: 3, name: 'CodePen', link: 'https://codepen.io/merrypjj', icon: faCodepen },
      ]);
    }, 5000);
  }, []);

  return (
    <div className="profile">
      <div>
        <h1 style={{ fontSize: '3rem' }}>
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ duration: 1000 }}>
            {props => <b style={props}> Hi, I'm Jun. </b>}
          </Spring>
          <br />
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ delay: 1000, duration: 1000 }}
          >
            {props => (
              <b style={props}>
                I'm a
                <Spring
                  from={{ color: 'black' }}
                  to={{ color: 'rgb(8, 95, 117)' }}
                  config={{ delay: 7000, duration: 1000 }}
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
            config={{ delay: 2000, duration: 1000 }}
          >
            {props => <b style={props}>living in Orange County, CA .</b>}
          </Spring>
        </h1>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 3000, duration: 1000 }}>
          {props => (
            <p style={{ color: 'black', fontSize: '1.5rem', ...props }}>
              <FontAwesomeIcon icon={faAddressCard} size="1x" style={{ color: 'black' }} /> Contact
              : merrypjj@yahoo.com
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
