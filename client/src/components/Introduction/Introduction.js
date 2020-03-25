import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

function Introduction() {
  const [introArray, setIntroductionArray] = useState([
    {
      key: 1,
      title: 'Who I Am?',
      text:
        "My name is Jun, I'm a frontend/full stack developer. I have nearly 3 years of web development experience. I love coding and making dynamic applications and products. In my spare time I love photography and spending my time with my family. I also speak three languages.",
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setIntroductionArray([
        ...introArray,
        {
          key: 2,
          title: 'Why Work With Me?',
          text:
            "I'm a detail-oriented, diligent and intellectually curious person. I'm a great team player and always lend a careful ear to work in a constructive way with my team.  As a consummate learner I’m always eager to learn new technologies and push the edge technically.",
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
          title: 'My Technical Background:',
          text:
            'MongodDB/mongoose,Express.JS,React.JS,Node.JS (MERN STACK),JavaScript,ES5/ES6,HTML5,CSS/SCSS,Boostrap,JSON,Jquery, webpack,D3,restful API,PUG, Git/Github ...',
        },
      ]);
    }, 4500);
  }, []);

  function Animated(items) {
    const transitions = useTransition(items, item => item.key, {
      from: { transform: 'translate3d(-1000px,0,0)', height: '0px', opacity: 0 },
      enter: { transform: 'translate3d(0px,0,0)', height: '200px', opacity: 1 },
      config: { duration: 2000 },
    });

    return transitions.map(({ item, key, props }) => {
      return (
        <animated.div
          key={key}
          style={{
            width: '380px',
            Height: '200px',
            border: '1px solid white',
            margin: '0px auto 10px auto',
            boxShadow: '2px 3px 3px black',
            ...props,
          }}
        >
          <div className="intro_title">{item.title}</div>
          <div className="intro_body">{item.text}</div>
        </animated.div>
      );
    });
  }

  return <div className="introduction_framework">{Animated(introArray)}</div>;
}

export default Introduction;
