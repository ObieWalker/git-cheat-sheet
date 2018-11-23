import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import signInValidator from '../helpers/signInVaidator';
import {authenticateUser} from '../actions/userAction';
import verifyToken from '../helpers/verifyToken';


export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.isValid = this.isValid.bind(this);
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (verifyToken()) {
      const { isAuthenticated } = this.props.user;
      if (isAuthenticated) {
        this.props.history.push('/cheats');
      }
    }
  }


  isValid() {
    const { errors, isValid } = signInValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }



  handleUserLogin(e) {
    e.preventDefault();
    const userDetails = {
      email: this.state.email,
      password: this.state.password
    };
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.authenticateUser(userDetails, this.props.history);
    }
  }
 
  render() {
    return (
      <div className="container">
        <h3 style={{ fontFamily: 'serif', marginTop: '5%' }}>
          Sign in to your account.{' '}
        </h3>
        <br /> <br />
        <div style={{}}>
          <form className="col s12 m6 push-m3 l4 push-l4">
            <div className="row">
            <label htmlFor="email">Email</label>
              <div className="input-field col s12 m6 push-m3 l4 push-l4">
                
                <input
                  className="validate"
                  error={this.state.errors.email}
                  onFocus={this.state.handleOnFocus}
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.email && (
                <span id="emailError" className="red-text">
                  {this.state.errors.email}
                </span>
              )}
            </div>
              <br />
            <div className="row">
              <label htmlFor="password">Password</label>
              <div className="input-field col s12 m6 push-m3 l4 push-l4">
                <input
                  className="validate"
                  // value={this.state.password.value}
                  onFocus={this.state.handleOnFocus}
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.password && (
                <span id="passwordError" className="red-text">
                  {this.state.errors.password}
                </span>
              )}
            </div>
            <br />
            <div className="row">
              <div className="col s12 m6 push-m3 l4 push-l4">
                <p> 
                  {'Do not have an account? You can register '}
                  <Link to="/register">here</Link>
                </p>
              </div>
            </div>
            <br />
            <div className="row col s12 m6 push-m3 l2 push-l4">
              <button
                type="submit"
                id="submit"
                name="btn_login"
                className="col s4 push-s4
                  m4 push-m4 l2 push-l5
                  btn btn-small waves-effect indigo"
                onClick={this.handleUserLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  UserSessionAction: PropTypes.func,
  router: PropTypes.object,
  history: PropTypes.object,
  loginUser: PropTypes.object,
  login: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authenticateUser
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
