import React from 'react';
import {
  Link,
} from 'react-router-dom';

import '../css/AppShowList.css';
import LoadingEllipsis from './LoadingEllipsis';

function AppShowList(props) {
  const { shows, loading, onFetchShowDetails } = props;

  return (
    <div className="list-wrapper">
      {loading ? <LoadingEllipsis /> :
        !shows.length ?
          <div className="no-data-available">No data available.</div>
          : shows.map((show) =>
              <Link to={`/details/${show.id}`}
                onClick={() => onFetchShowDetails(show.id)}
                key={show.id}>
                <div className="show" key={show.id}>
                  <span className="rating">
                    {displayRating(show.rating.average || 0)}
                  </span>
                  <img src={show.image ? show.image.medium || '' : ''}
                    alt={show.name} className="thumbnail" />
                  <div className="details">
                    <div className="title">
                      {show.name}
                    </div>
                    <span className="genre">
                      {displayGenres(show.genres || [])}
                    </span>
                  </div>
                </div>
              </Link>
            )}
    </div>
  );
}

/**
 * Convert rating to decimal for consistency.
 * @param {number} average Movie/Show rating.
 */
function displayRating(average) {
  return average.toFixed(1);
}

/**
 * Concatenate genres.
 * @param {Array} genres List of genres.
 */
function displayGenres(genres) {
  return genres.map((genre, i) => {
    return genre.length === i + 1 ? genre : genre + ', ';
  });
}

export default AppShowList;
