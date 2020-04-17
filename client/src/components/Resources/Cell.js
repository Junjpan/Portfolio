/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import Message from '../Message/Message';

function Cell({ subject, articalsArr, id, setArticleView, setTechId }) {
  const [editName, setEditName] = useState(false);
  const [message, setMessage] = useState('');
  const menuContainer = React.createRef();

  function handleClickOutside(e) {
    if (menuContainer.current && !menuContainer.current.contains(e.target)) {
      setEditName(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  useEffect(() => {
    setTimeout(() => setMessage(''), 10000);
  }, [message]);

  const openPrompt = () => {
    setEditName(false);
    if (localStorage.token) {
      // eslint-disable-next-line no-alert
      const Updatedsubject = prompt('Please Enter your new subject:');

      axios
        .post(
          `/api/technical/changename/${id}`,
          { subject: Updatedsubject },
          {
            headers: { authentication: `Bearer ${localStorage.token}` },
          },
        )
        .then(res => console.log(res.data))
        .catch(err => setMessage(err.response.data.message));
    } else {
      setMessage("You don't have the right to change the subject's Name.");
    }
  };

  return (
    <div className="cell">
      {editName ? (
        <div className="menu" ref={menuContainer}>
          <div onClick={openPrompt}>Change Subject</div>
          <div
            onClick={() => {
              setArticleView(true);
              setTechId(id);
            }}
          >
            View Articles
          </div>
        </div>
      ) : (
        <FontAwesomeIcon
          icon={faEllipsisV}
          className="Ellipsis_icon"
          onClick={() => setEditName(true)}
        />
      )}
      <Message message={message} />
      {subject}
      <p>
        {articalsArr.length >= 1
          ? `${articalsArr.length} articles`
          : `${articalsArr.length} article`}
      </p>
    </div>
  );
}

Cell.defaultProps = {
  subject: '',
  articalsArr: [],
  id: '',
  setArticleView: () => {},
  setTechId: () => {},
};

Cell.propTypes = {
  subject: PropTypes.string,
  articalsArr: PropTypes.instanceOf(Array),
  id: PropTypes.string,
  setArticleView: PropTypes.func,
  setTechId: PropTypes.func,
};

export default Cell;
