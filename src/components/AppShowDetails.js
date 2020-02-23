import React from 'react';
import { useHistory } from 'react-router-dom';

import '../css/AppShowDetails.css';
import LoadingEllipsis from './LoadingEllipsis';

function AppShowDetails({ details, loading }) {
  const history = useHistory();

  return (
    loading ? <LoadingEllipsis />
      : <div className="details-wrapper">
          <span className="back-wrapper" onClick={() => history.goBack()}>
            <i className="fas fa-chevron-left back" />
            Show List
          </span>
          <content>{details.name}</content>
      </div>
  );
}

export default AppShowDetails;
