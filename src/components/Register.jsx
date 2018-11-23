import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from 'react-loading-animation';
import { bindActionCreators } from 'redux';
import {authenticateUser, registerUser} from '../actions/userAction'
import validator from '../helpers/registerValidator';
import verifyToken from '../helpers/verifyToken';

/**
 *
 *
 * @class Register
 * @extends {Component}
 */
export class Register extends Component {
  /**
   *Creates an instance of Register.
   * @param {*} props
   * @memberof Register
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      verifyPassword: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  /**
   *@returns {*} null
   *
   * @memberof Register
   */
  componentDidMount() {
    if (verifyToken()) {
      this.props.history.push('/dashboard');
    }
  }
  /**
   *@returns {*} null
   *
   * @param {*} e
   * @memberof Register
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
   *@returns {boolean} validity
   *
   * @memberof Register
   */
  isValid() {
    const { errors, isValid } = validator(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   *@returns{*} null
   *
   * @param {*} e
   * @memberof Register
   */
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({
        errors: {},
        isLoading: true
      });
      const userDetails = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        verifyPassword: this.state.verifyPassword
      };
      this.props.registerUserAction(userDetails).then(() => {
        const { registerUserError } = this.props.registerUser;
        if (registerUserError === '') {
          const userLogin = {
            email: userDetails.email,
            password: userDetails.password
          };
          this.props.login(userLogin, this.props.history);
        }
      });
      this.setState({
        isLoading: false
      });
    }
  }
  /**
   *@returns {*} null
   *
   * @param {*} event
   * @memberof Register
   */
  handleOnFocus(event) {
    this.setState({
      // merges to display error if user should focus
      errors: Object.assign({}, this.state.errors, { [event.target.name]: '' })
    });
  }
  /**
   *
   *
   * @returns {object} regitser form
   * @memberof Register
   */
  render() {
    return (
      <div>
        <br />
        <h3 style={{ fontFamily: 'serif' }}>Enter Registration Details.</h3>
        <hr />
        {this.props.registerUser.registerUserError && (
          <h6 className="red-text">
            {this.props.registerUser.registerUserError}
          </h6>
        )}
        <br />
        <div className="container">
          {this.state.isLoading === true ||
            this.props.registerUser.isUserRegistering ? <div>
              <p>Loading...</p> <Loading />
            </div> : null}
          <form className="col s12 m6 push-m3 l4 push-l4">

            <div className="row">
              <label htmlFor="username">Username:</label>
              <div className="input-field col s12 m6 l6">
                <input
                  id="username"
                  onChange={this.handleChange}
                  onFocus={this.handleOnFocus}
                  name="username"
                  type="text"
                  className="validate username"
                />
                {this.state.errors.username && (
                  <span id="usernameError" className="red-text">
                    {this.state.errors.username}
                  </span>
                )}
              </div>
              <br />
                <label htmlFor="email">Email:</label>
              <div className="input-field col s12 m6 l6">
                <input
                  id="email"
                  onChange={this.handleChange}
                  onFocus={this.handleOnFocus}
                  name="email"
                  type="email"
                  className="validate email"
                />
                {this.state.errors.email && (
                  <span id="emailError" className="red-text">
                    {this.state.errors.email}
                  </span>
                )}
              </div>
            </div>
            <br />

            <div className="row">
                <label htmlFor="password">Password:</label>
              <div className="input-field col s12 m6 l6">
                <input
                  id="password"
                  onChange={this.handleChange}
                  onFocus={this.handleOnFocus}
                  name="password"
                  type="password"
                  className="password"
                />
                {this.state.errors.password && (
                  <span id="passwordError" className="red-text">
                    {this.state.errors.password}
                  </span>
                )}
              </div>
              <br />

              <label htmlFor="password2">Confirm Password:</label>
              <div className="input-field col s12 m6 l6">
                <input
                  id="password2"
                  onChange={this.handleChange}
                  onFocus={this.handleOnFocus}
                  name="verifyPassword"
                  type="password"
                  className="validate verifyPassword"
                />
                {this.state.errors.verifyPassword && (
                  <span className="red-text">
                    {this.state.errors.verifyPassword}
                  </span>
                )}
              </div>
            </div>
            <br />
            <p>{'Already have an account? '}<Link to="/">Click here to Sign In </Link></p>

            <button
              className="waves-effect waves-light btn right hoverable indigo"
              onClick={this.onSubmit}
              // disabled={isEnabled}
              type="submit"
            >register
            </button>
            <br />
          </form>
          <br />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUserAction: PropTypes.func,
  registerUser: PropTypes.object,
  login: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  registerUser: state.registerUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerUser,
      authenticateUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Register);