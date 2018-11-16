import React, { Component } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage';

class App extends Component {
  render() {
    return (
      <div 
      // style={{ backgroundColor: '#282c34'}}
      >
        <div className="container">
          <LandingPage />
        </div>
      </div>
    );
  }
}

export default App;
