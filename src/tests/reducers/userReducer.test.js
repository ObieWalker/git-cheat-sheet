/*eslint-disable */
import expect from 'expect';
import isEmpty from 'lodash/isEmpty';
import userReducer from '../../reducers/userReducer';
import * as types from '../../actions/actionTypes';
import {users} from '../__mocks__/usersData';

describe('Set user', () => {
  const initialState = {
    user: {
      isAuthenticated: false,
      user: {}
    }
  };
  const state = users;

  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState.user);
  });

  it('should handle SET_CURRENT_USER', () => {
    const loginUser = {
      type: types.SET_CURRENT_USER,
      isAuthenticated: !isEmpty(users[0]),
      user: users[0]
    };
    expect(userReducer({}, loginUser)).toEqual({
      isAuthenticated: true,
      user: users[0]
    });
  });

})