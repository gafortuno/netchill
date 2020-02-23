import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import '../css/AppShowDetails.css';
import LoadingEllipsis from './LoadingEllipsis';

function AppShowDetails({ details, loading }) {
  const history = useHistory();

  return (
    loading ? <LoadingEllipsis />
      : <div className="details">
          <span className="back-wrapper" onClick={() => history.goBack()}>
            <i className="fas fa-chevron-left back" />
            Show List
          </span>
          {details && Object.keys(details).length ?
            <div className="details-wrapper">
              <div className="left">
                <a href={details.officialSite}>
                  <img src={details.image ? details.image.medium || '' : ''} alt={details.name} />
                </a>
              </div>
              <div className="right">
                <span className="title">
                  {details.name}
                  <span className="rating">
                    {displayRating(details.rating ? details.rating.average || 0 : 0)}
                  </span>
                </span>
                <div className="genre">{displayGenres(details.genres || [])}</div>
                <div className="extra-details">
                  <div>Language: <span>{details.language}</span></div>
                  <div>Status: <span>{details.status}</span></div>
                  <div>Date Premiered: <span>{details.premiered}</span></div>
                  <div>Type: <span>{details.type}</span></div>
                  <div>Run time: <span>{details.runtime}</span></div>
                  <div>Schedule:
                    <span> {displaySchedule(details.schedule ? details.schedule.days || [] : [])}
                    {details.schedule ? details.schedule.time || '-' : '-'}</span></div>
                </div>
                <div className="summary">{ReactHtmlParser(details.summary)}</div>
              </div>
            </div>
          : <div>No data available.</div>}
        </div>
  );
}

/**
 * Concatenate schedule days.
 * @param {Array} schedule
 */
  function displaySchedule(schedule) {
    return schedule.map((sched, i) => {
      return sched.length === i + 1 ? sched : sched + ', ';
    });
  }

/**
 * Convert rating to decimal for consistency.
 * @TODO Create a utility for this.
 * @param {number} average Movie/Show rating.
 */
function displayRating(average) {
  return average.toFixed(1);
}

/**
 * Concatenate genres.
 * @TODO Create a utility for this.
 * @param {Array} genres List of genres.
 */
function displayGenres(genres) {
  return genres.map((genre, i) => {
    return genre.length === i + 1 ? genre : genre + ', ';
  });
}

export default AppShowDetails;
