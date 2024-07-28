/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { Spring } from 'react-spring/renderprops';
import { useTransition, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faCodepen, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import profileImage from '../../assets/june.jpg';

function Profile() {
  const [newArray, setNewArray] = useState([]);
  function Animation(items) {
    const transitions = useTransition(items, item => item.key, {
      from: { transform: 'translate3d(0,20px,0)', opacity: 0 },
      enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
      config: { duration: 350 },
      delay: 1000,
    });

    return transitions.map(({ item, key, props }) => {
      return (
        <animated.p
          key={key}
          style={{
            color: 'black',
            fontSize: '1.5rem',
            ...props,
          }}
        >
          <FontAwesomeIcon icon={item.icon} size="1x" style={{ color: 'black' }} /> {item.name}
          {' : '}
          <a href={item.link ? item.link : '#'} target="_blank" rel="noopener noreferrer">
            {item.link ? item.link : item.text}
          </a>
        </animated.p>
      );
    });
  }

  useEffect(() => {
    const timer0 = setTimeout(() => {
      setNewArray([{ key: 1, name: 'Contact', text: 'merrypjj@yahoo.com', icon: faAddressCard }]);
    }, 2500);
    const timer1 = setTimeout(() => {
      setNewArray([
        ...newArray,
        { key: 2, name: 'Github', link: 'https://github.com/Junjpan', icon: faGithubSquare },
      ]);
    }, 3500);

    const timer2 = setTimeout(() => {
      setNewArray([
        ...newArray,
        {
          key: 3,
          name: 'Linkedin',
          link: 'https://www.linkedin.com/in/j-pan-b5b07a155/',
          icon: faLinkedin,
        },
      ]);
    }, 4500);

    return () => {
      clearTimeout(timer0);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="profile">
      <div>
        <h1>
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
                  to={{
                    color: 'white',
                    textShadow: '0 0 3px black,0 0 5px black',
                  }}
                  config={{ delay: 7000, duration: 1000 }}
                >
                  {prop => (
                    <span style={prop}>
                      {' '}
                      Sr. Design technologist/UX Engineer/Frontend Developer
                    </span>
                  )}
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
