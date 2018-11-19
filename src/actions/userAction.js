import axios from 'axios';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import { setAuthToken } from '../helpers/setAuthToken'
import * as types from './actionTypes';

export const authenticateUserSuccess = user => {
  return {
    type: types.SET_CURRENT_USER,
    user
  }
}

export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

export const logOut = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthToken(false);
  toastr.success('You have been logged out!!');
  dispatch(setCurrentUser({}));
};

export const authenticateUser = (userDetails, history) => (dispatch) => {
  return axios({
    method: 'POST',
    url: '/api/v1/signin',
    data: userDetails
  })
  .then(response => {
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
    dispatch(authenticateUserSuccess(response.data.user))
    if (response.data.user) {
      history.push('/cheats');
    }
  })
  .catch((error) => {
    toastr.error(error.response.data.message) 
  });
}

