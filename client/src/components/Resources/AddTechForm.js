/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Message from '../Message/Message';

function AddTechForm({ setAdd }) {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    setTimeout(() => setMessage(''), 10000);
  }, [message]);

  const addTechForm = e => {
    e.preventDefault();
    axios
      .post(
        '/api/technical/add',
        { subject },
        {
          headers: { authentication: `Bearer ${localStorage.token}` },
        },
      )
      .then(res => {
        setMessage(err.data.message);
        document.getElementById('addTechForm').reset();
      })
      .catch(err => setMessage(err.response.data.message));
  };

  return (
    <form className="addTechForm" id="addTechForm" onSubmit={addTechForm}>
      <Message message={message} />
      <input
        type="text"
        id="subject"
        placeholder="Subject"
        onChange={e => {
          setSubject(e.target.value);
        }}
        required
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="submit">ADD</button>
        <button
          type="button"
          onClick={() => {
            setAdd(false);
          }}
        >
          CLOSE
        </button>
      </div>
    </form>
  );
}

AddTechForm.defaultProps = {
  setAdd: () => {},
};

AddTechForm.propTypes = {
  setAdd: PropTypes.func,
};
export default AddTechForm;
