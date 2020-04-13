/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AddTechForm from './AddTechForm';
import Loading from '../Buttons/Loading';
import Cell from './Cell';
import Articles from './Articles';

function Technicals() {
  const [technicals, setTechnicals] = useState([]);
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articleView, setArticleView] = useState(false);
  const [techId, setTechId] = useState('');

  useEffect(() => {
    axios
      .get('/api/technical/all')
      .then(res => {
        setTechnicals(res.data.technicals);
        setLoading(false);
      })
      .catch(err => console.log(err.response.data));
  }, [technicals]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : articleView ? (
        <Articles techId={techId} setArticleView={setArticleView} />
      ) : (
        <div className="res_center">
          {technicals.map(technical => {
            return (
              <Cell
                key={technical._id}
                id={technical._id}
                subject={technical.subject}
                articalsArr={technical.articalsArr}
                setArticleView={setArticleView}
                setTechId={setTechId}
              />
            );
          })}
          {add ? (
            <AddTechForm setAdd={setAdd} />
          ) : (
            <div className="cell" onClick={() => setAdd(true)}>
              <FontAwesomeIcon icon={faPlus} style={{ color: '#08fdd8', fontSize: '5rem' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Technicals;
