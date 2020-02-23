import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import '../css/AppHeader.css';

function AppHeader({ onSearchItem, location }) {
  return (
    <header>
      {location.pathname === '/net-chill/' || location.pathname === '/net-chill' ?
        <span className="search-wrapper">
          <i className="fas fa-search"></i>
          <input type="text" id="searchInput"
          onChange={onSearchItem} className="search-input" />
        </span> : null}
    </header>
  );
}

export default withRouter(AppHeader);
