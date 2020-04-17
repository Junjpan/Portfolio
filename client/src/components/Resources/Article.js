/* eslint-disable no-undef */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBookOpen, faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Message from '../Message/Message';

function Article({ techId, id, title, link, source, date }) {
  const [message, setMessage] = useState('');

  const deleteArticle = () => {
    // axios.delete does support a request body. and it has two parameters: url and optional config
    // we can use config.data to set the response body like axios.delete(url,{data:{foo:'bar'}}),for post,put and patch accept 3 parameters
    // url,data and config so you can use the second parameter to set the response body like axios.put(url,{foo:'bar'})
    axios
      .delete(
        `/api/technical/article/${id}`,
        { data: { techId } },
        {
          headers: { authentication: `Bearer ${localStorage.token}` },
        },
      )
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage(err.response.data.message));
  };
  return (
    <div className="article_cell">
      <Message message={message} />
      <p style={{ fontSize: '2rem', textAlign: 'left', marginLeft: '10%' }}>
        <FontAwesomeIcon icon={faBookmark} style={{ marginRight: '10px' }} className="art_icon" />
        <a href={link} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}
      >
        <p style={{ marginRight: '10px' }}>
          <FontAwesomeIcon icon={faBookOpen} className="art_icon" />
          {`  ${source}`}
        </p>
        <p style={{ marginRight: '10px' }}>
          <FontAwesomeIcon icon={faCalendar} className="art_icon" />
          {!date ? ` Not avaiable ` : `  ${date.slice(0, 10)}`}
        </p>
        {localStorage.token && (
          <button type="button" onClick={deleteArticle}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

Article.defaultProps = {
  techId: '',
  id: '',
  title: '',
  link: '',
  source: '',
  date: '',
};

Article.propTypes = {
  techId: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
  source: PropTypes.string,
  date: PropTypes.string,
};

export default Article;
