import React, { Component } from 'react';
import SearchBar from './SearchBar'
import Categories from './Categories'
import { Grid } from 'react-bootstrap';

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };

    this.updateSearch = this.updateSearch.bind(this)

  }

  updateSearch(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <SearchBar 
          updateSearch={this.updateSearch}
          />
        <br />
        <div className="container">
            <Categories 
            search={this.state.search}/>
        </div>
      </div>
    );
  }
}

export default LandingPage;
