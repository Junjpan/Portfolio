import React from 'react';
import PropTypes from 'prop-types';

function GeneralBtn({ buttonName }) {
  return <div className="generalBTN">{buttonName}</div>;
}

GeneralBtn.defaultProps = {
  buttonName: '',
};

GeneralBtn.propTypes = {
  buttonName: PropTypes.string,
};
export default GeneralBtn;
