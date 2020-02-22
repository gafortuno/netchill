import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import * as serviceWorker from './serviceWorker';

import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shows: [],
    };

    this.searchItem = this.searchItem.bind(this);
  }

  componentDidMount() {
    // Get the list of shows
    axios.get('http://api.tvmaze.com/shows')
      .then(response => {
        const shows = response.data;

        this.setState({ shows });
    });
  }

  render() {
    return (
      <div>
        <header>
          <i className="fas fa-search"></i>
          <input type="text" id="searchInput"
            onChange={this.searchItem} className="search-input" />
        </header>
        <main>
          <div className="wrapper">
            {this.state.shows.map((show) =>
              <div className="show" key={show.id}>
                <span className="rating">
                  {this.displayRating(show.rating)}
                </span>
                <img src={this.displayThumbnail(show.image)}
                  alt={show.name} className="thumbnail" />
                <div className="details">
                  <div className="title">
                    {show.name}
                  </div>
                  <span className="genre">
                    {this.displayGenres(show.genres)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  /**
   * Convert rating to decimal for consistency.
   * @param {Number} rating Movie/Show rating.
   */
   displayRating(rating) {
    // Need an early return because the API response is inconsistent.
    if (!rating) return '-';
  
    const { average } = rating;
  
    if (!average) return '-';
  
    return average.toFixed(1);
  }

  /**
   * Concatenate genres.
   * @param {Array} genres List of genres.
   */
  displayGenres(genres) {
    // Need an early return because the API response is inconsistent.
    if (!genres) return;
  
    const length = genres.length;
  
    if (!length) return '-';
  
    return genres.map((genre, i) => {
      return length === i + 1 ? genre : genre + ', ';
    });
  }

  /**
   * Responsible in displaying the thumbnail.
   * @param {Object} src Contains the img src.
   */
  displayThumbnail(image) {
    // Need an early return because the API response is inconsistent.
    if (!image) return;
  
    const { medium } = image;
  
    if (!medium) return;
  
    return medium;
  }

  /**
   * Search for shows.
   * @TODO Add Debounce to prevent too frequent API calls.
   * @param {Object} event Event object.
   */
  searchItem(event) {
    const { value } = event.currentTarget;
   
    if (!value) return;
  
    axios.get(`http://api.tvmaze.com/search/shows?q=${value}`)
     .then(response => {
      const showsRaw = response.data;
      const shows = [];

      showsRaw.forEach((showRaw) => {
        shows.push(showRaw.show);
      });

      this.setState({ shows });
     });
   }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
