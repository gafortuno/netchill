import React from 'react';
import '../css/LoadingEllipsis.css';

function LoadingEllipsis() {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingEllipsis;
