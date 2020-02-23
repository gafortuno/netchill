import React from 'react';
import '../css/AppShowDetails.css';
import LoadingEllipsis from './LoadingEllipsis';

function AppShowDetails({ details, loading }) {
  return (
    loading ? <LoadingEllipsis />
      : <div>{details.name}</div>
  );
}

export default AppShowDetails;
