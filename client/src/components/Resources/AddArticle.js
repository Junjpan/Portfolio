/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Message from '../Message/Message';

function AddArticle({ setAddArticle, techId }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [source, setSource] = useState('');
  const [message, setMessage] = useState('');

  const addArticle = e => {
    e.preventDefault();
    const info = { title, link, source };
    if (localStorage.token) {
      axios
        .post(`/api/technical/articles/add/${techId}`, info, {
          headers: { authentication: `Bearer ${localStorage.token}` },
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => setMessage(err.response.data.message));
    } else {
      setMessage('Sorry, you action is forbidden.');
    }
  };

  useEffect(() => {
    setTimeout(() => setMessage(''), 10000);
  }, [message]);

  return (
    <div className="addArticle">
      <form className="addArticle_form" onSubmit={addArticle}>
        <Message message={message} />
        <label htmlFor="arc_title">
          Title:
          <br />
          <input
            type="text"
            id="arc_title"
            onChange={e => {
              setTitle(e.target.value);
            }}
            required
          />
          <br />
        </label>
        <label htmlFor="link">
          Link:
          <br />
          <input
            type="text"
            id="link"
            onChange={e => {
              setLink(e.target.value);
            }}
            required
          />
          <br />
        </label>
        <label htmlFor="source">
          Source From:
          <br />
          <input
            type="text"
            id="scource"
            onChange={e => {
              setSource(e.target.value);
            }}
          />
          <br />
        </label>
        <button type="submit">Add</button>
        <button type="button" onClick={() => setAddArticle(false)}>
          Close
        </button>
      </form>
    </div>
  );
}

AddArticle.defaultProps = {
  setAddArticle: () => {},
  techId: '',
};

AddArticle.propTypes = {
  setAddArticle: PropTypes.func,
  techId: PropTypes.string,
};

export default AddArticle;
