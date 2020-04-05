import React from 'react';

function Loading() {
  return (
    <div style={{ margin: '200px auto', textAlign: 'center', color: 'white' }}>
      Loading ...
      <div className="loading_outer">
        <div className="loading_inner" />
      </div>
    </div>
  );
}

export default Loading;
