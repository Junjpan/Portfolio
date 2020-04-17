/* eslint-disable no-unused-vars */
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
  const [date, setDate] = useState();

  const addArticle = e => {
    e.preventDefault();
    const info = { title, link, source, date };
    if (localStorage.token) {
      axios
        .post(`/api/technical/articles/add/${techId}`, info, {
          headers: { authentication: `Bearer ${localStorage.token}` },
        })
        .then(res => {
          setTitle('');
          setLink('');
          setSource('');
        })
        .catch(err => setMessage(err.response.data.message));
    } else {
      setMessage("Sorry, you are't authorized to add an article link.");
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
        <label htmlFor="date">
          Date of the Article:
          <br />
          <input
            type="date"
            id="date"
            onChange={e => {
              setDate(e.target.value);
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
