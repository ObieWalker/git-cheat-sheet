import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import verifyToken from './verifyToken';

export default (ProtectedComponent) => {

  class Authenticate extends Component {

    componentDidMount() {
      if (!verifyToken()) {
        this.context.router.history.push('/login');
      }
    }

    render() {
      return (
        <ProtectedComponent { ...this.props }/>
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  Authenticate.contextTypes = {
    router: PropTypes.shape().isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
  });

  return connect(mapStateToProps)(Authenticate);
};
