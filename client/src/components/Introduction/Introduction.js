import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faUsersCog, faCode } from '@fortawesome/free-solid-svg-icons';

function Introduction() {
  const [introArray, setIntroductionArray] = useState([
    {
      key: 1,
      title: 'ABOUT ME',
      icon: faAddressCard,
      text: `
      My name is Jun, I'm an UX engineer/frontend 
      developer. I have 4+ years of web development  
      experience.I love coding and making dynamic  
      applications and products. In my spare time I love  
      photography andspending my time with my family. I 
      also speak three languages.`,
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setIntroductionArray([
        ...introArray,
        {
          key: 2,
          title: 'Why Work With Me?',
          icon: faUsersCog,
          text: `   
          I'm a detail-oriented, diligent and intellectually 
          curious person. I'm a great team player and 
          always lend a careful ear to work in a 
          constructive way with my team.  As a 
          consummate learner I’m always eager to learn 
          new technologies and push the edge technically.`,
        },
      ]);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIntroductionArray([
        ...introArray,
        {
          key: 3,
          title: 'My Technical Background',
          icon: faCode,
          text: `
          Languages: Javascript/ES6, Typescript,CSS3,
                SASS(SCSS),HTML5/HTML,Pug(JADE),GraphQL
          Libraries/APIs: React,Redux,Node.js,Jquery, 
                  Socket.io,Styled Component,D3.js,Chart.js                        
          Frameworks: Express.js,Boostrap
          Tools: Git,NPM,VS Code,Webpack,Terminal
          Storages: MongoDB 
          Platform: VS Code,Windows,Github,Heroku,
                          Codepen,Cloudinary,Figma 
          Others: MERN Stack,Full Stack,Frontend,UI,
                      Figma plugin,Restful APIs,JSON,AJAX,
                      Responsive web design.`,
        },
      ]);
    }, 4500);
  }, []);

  function Animated(items) {
    const transitions = useTransition(items, item => item.key, {
      from: { transform: 'translate3d(-1000px,0,0)', height: '0px', opacity: 0 },
      enter: { transform: 'translate3d(0px,0,0)', height: '340px', opacity: 1 },
      config: { duration: 2000 },
    });

    // border: '1px solid white',
    // boxShadow: '2px 3px 3px black',
    return transitions.map(({ item, key, props }) => {
      return (
        <animated.div
          key={key}
          style={{
            width: '310px',
            height: '340px',
            margin: '0px auto 10px auto',
            ...props,
          }}
        >
          <div className="intro_title">
            <FontAwesomeIcon
              icon={item.icon}
              style={{ marginRight: '10px', color: 'rgb(63, 79, 99)' }}
            />
            {item.title}
          </div>
          <div className="intro_body">{item.text}</div>
        </animated.div>
      );
    });
  }

  return <div className="introduction_framework">{Animated(introArray)}</div>;
}

export default Introduction;
