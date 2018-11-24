import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="container-fluid">
    <div className="jumbotron">
      <h4>(404) This page does not exist, click <Link to="/cheats">here</Link> to go to an actual page.</h4>
    </div>
  </div>
);

export default NotFoundPage;