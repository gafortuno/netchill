import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './css/index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

import AppHeader from './components/AppHeader';
import AppShowList from './components/AppShowList';
import AppShowDetails from './components/AppShowDetails';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shows: [],
      showsRequestLoading: false,
      showDetails: {},
      showDetailsRequestLoading: false,
    };

    this.searchItem = this.searchItem.bind(this);
    this.fetchShowDetails = this.fetchShowDetails.bind(this);
  }

  componentDidMount() {
    // Get the list of shows
    this.setState({ showsRequestLoading: true });
    // Enhancement: API should return only needed information
    axios.get('http://api.tvmaze.com/shows')
      .then(response => {
        const shows = response.data;

        this.setState({ shows });
      }).finally(() => {
        this.setState({ showsRequestLoading: false });
      });
  }

  render() {
    return (
      <Router>
        <AppHeader onSearchItem={this.searchItem} />
        <main>
          <Switch>
            <Route exact path="/">
              <AppShowList shows={this.state.shows}
                loading={this.state.showsRequestLoading}
                onFetchShowDetails={() => this.fetchShowDetails('1')} />
            </Route>

            <Route path='/details/:id'>
              <AppShowDetails details={this.state.showDetails}
                loading={this.state.showDetailsRequestLoading} />
            </Route>
          </Switch>
        </main>
      </Router>
    );
  }

  /**
   * Fetch show details.
   * @param {string} id Show ID.
   */
  fetchShowDetails(id) {
    this.setState({ showDetailsRequestLoading: true });
    axios.get(`http://api.tvmaze.com/shows/${id}`)
      .then(response => {
        const showDetails = response.data;
        
        this.setState({ showDetails });
      }).finally(() => {
        this.setState({ showDetailsRequestLoading: false });
      });
  }

  /**
   * Search for shows.
   * @TODO Add Debounce to prevent too frequent API calls.
   * @param {Object} event Event object.
   */
  searchItem(event) {
    const { value } = event.currentTarget;
   
    if (!value) return;

    this.setState({ showsRequestLoading: true });
    axios.get(`http://api.tvmaze.com/search/shows?q=${value}`)
     .then(response => {
        const showsRaw = response.data;
        const shows = [];

        showsRaw.forEach((showRaw) => {
          shows.push(showRaw.show);
        });

        this.setState({ shows });
      }).finally(() => {
        this.setState({ showsRequestLoading: false });
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
