import axios from 'axios';

// this sets authorizationa after a user signs in
export const setAuthToken = (token) => {
  // checks if a token exists
  if (token) {
    // specify config defaults for every request
    axios.defaults.headers.common.token = token;
  } else {
    delete axios.defaults.headers.common.token;
  }
};