import React from 'react';
import PropTypes from 'prop-types';

function CommonBtn({ name }) {
  return (
    <div className="project_btn">
      {name}
      <div className="outer_circle">
        <div className="inner_circle" />
      </div>
    </div>
  );
}

CommonBtn.defaultProps = {
  name: '',
};

CommonBtn.propTypes = {
  name: PropTypes.string,
};

export default CommonBtn;
