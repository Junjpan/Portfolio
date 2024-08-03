import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faUsersCog, faCode } from '@fortawesome/free-solid-svg-icons';

function Introduction() {
  const [introArray, setIntroductionArray] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIntroductionArray([
        {
          key: 1,
          title: 'ABOUT ME',
          icon: faAddressCard,
          text: `
          My name is Jun, I'm a Sr. Design technologist/UX 
          engineer/frontend developer. I have 7+ years of 
          web development experience.I love coding and
          making dynamic applications,tools and products. In my 
          spare time I love photography and spending my 
          time with my family. I also speak three languages.`,
        },
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
        {
          key: 3,
          title: 'My Technical Background',
          icon: faCode,
          text: `
          Languages: Javascript/ES6, Typescript, CSS3/CSS, 
                            SASS/SCSS, HTML5/HTML, Graphql
          Frameworks: Express.js, Next.js
          Libraries/APIs: React, Redux, Node.js, Storybook
          Tools: Git, NPM, VS Code ,Webpack ,Codepen
          Storages: MongoDB, DynamoDB, Firebase, Airtable
          Cloud service: AWS amplify, S3, Google cloud, 
                                  Heroku
          Design tool: Figma 
          Others: Frontend, Figma Plugin, Design system, UI 
                      development, MERN Stack, Full Stack, 
                      Accessibility, Animation, Restful APIs, 
                      tooling, Responsive web design, Google 
                      analytics.`,
        },
      ]);
    }, 3500);
  }, []);

  function Animated(items) {
    const transitions = useTransition(items, item => item.key, {
      from: { transform: 'translate3d(0px,20px,0)', height: '0px', opacity: 0 },
      enter: { transform: 'translate3d(0px,0,0)', height: '340px', opacity: 1 },
      config: { duration: 350 },
    });

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
          className="intro_container"
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
