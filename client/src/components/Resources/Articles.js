/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimesCircle, faHome, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loading from '../Buttons/Loading';

function Articles({ techId, setArticleView }) {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [articleArr, setArticleArr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setMessage(''), 10000);
  }, [message]);

  useEffect(() => {
    axios
      .get(`/api/technical/articles/${techId}`)
      .then(res => {
        console.log(res.data);
        setSubject(res.data.info.subject);
        setArticleArr(res.data.info.articalsArr);
        setLoading(false);
      })
      .catch(err => {
        setMessage(err.response.data.message);
      });
  }, []);

  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="arc_center">
          {showSidebar ? (
            <span className="res_closeBTN" onClick={() => setShowSidebar(false)}>
              <FontAwesomeIcon icon={faTimesCircle} size="2x" />
            </span>
          ) : (
            <span className="res_burgerBTN" onClick={() => setShowSidebar(true)}>
              <FontAwesomeIcon icon={faBars} size="2x" />
            </span>
          )}
          <div className={showSidebar ? 'show_res_sidebar' : 'res_sidebar_container'}>
            <div className="sidebar_content">
              {subject}
              <p style={{ fontSize: '1.2rem', color: 'gray', margin: '10px auto' }}>
                {`${articleArr.length} articles`}
              </p>
              <FontAwesomeIcon
                className="article_sidebar_icon"
                icon={faHome}
                title="Main Page"
                onClick={() => setArticleView(false)}
              />
              <FontAwesomeIcon
                className="article_sidebar_icon"
                icon={faPlusSquare}
                title="Add a new article Link"
              />
            </div>
          </div>
          <div className="discclaimer">
            Disclaimer:These links are being provided as a convenience and for informational
            purposed only. I bear no responsibility for the accuracy, legality of content of the
            external site of for that of subsequent links.The original author of the article has the
            full copyright of the article.
          </div>
        </div>
      )}
    </div>
  );
}

Articles.defaultProps = {
  techId: '',
  setArticleView: () => {},
};

Articles.propTypes = {
  techId: PropTypes.string,
  setArticleView: PropTypes.func,
};

export default Articles;
