import React from 'react';
import PropTypes from 'prop-types';

function Message({ message }) {
  return <div style={{ color: 'red', textAlign: 'center', fontSize: '1.5rem' }}>{message}</div>;
}

Message.defaultProps = {
  message: '',
};

Message.propTypes = {
  message: PropTypes.string,
};

export default Message;
