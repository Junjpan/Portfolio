/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

function ProjectOption({ projectNamesArray, setEditProjectIndex }) {
  return (
    <select
      onChange={e => {
        setEditProjectIndex(e.target.value);
      }}
      style={{
        marginTop: '100px',
        marginLeft: '10%',
        height: '30px',
        width: '200px',
        fontSize: '1.5rem',
        border: '3px solid rgb(8, 74, 135)',
      }}
    >
      <option value="undefined">Select Project</option>
      {projectNamesArray.map((name, i) => {
        // eslint-disable-next-line react/no-array-index-key
        return (
          <option value={i} key={i}>
            {name}
          </option>
        );
      })}
    </select>
  );
}

ProjectOption.defaultProps = {
  projectNamesArray: [],
  setEditProjectIndex: () => {},
};

ProjectOption.propTypes = {
  projectNamesArray: PropTypes.instanceOf(Array),
  setEditProjectIndex: PropTypes.func,
};

export default ProjectOption;
