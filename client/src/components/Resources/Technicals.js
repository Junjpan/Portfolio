/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AddTechForm from './AddTechForm';
import Loading from '../Buttons/Loading';

function Technicals() {
  const [technicals, setTechnicals] = useState([]);
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(true);

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
      ) : (
        <div className="res_center">
          {technicals.map(technical => {
            return (
              <div className="cell" key={technical._id}>
                {technical.subject}
              </div>
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
