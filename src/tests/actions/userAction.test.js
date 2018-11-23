import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import { logOut, authenticateUser, registerUser} from '../../actions/userAction'
import * as types from '../../actions/actionTypes';
import { users, response } from '../__mocks__/usersData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);



describe('set current user actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles SET_CURRENT_USER to log in a user', () => {
    let user = users[0];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {user}
      });
    });
    const expectedActions = [{ type: types.SET_CURRENT_USER, user }];
    const store = mockStore({ user: [] });
    return store.dispatch(authenticateUser(user, [])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
})

describe('set current user actions to log out', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles SET_CURRENT_USER to log in a user', () => {
    const user = {};
    const expectedActions = [{ type: types.SET_CURRENT_USER, user }];
    const store = mockStore({});
    store.dispatch(logOut());
    expect(store.getActions()).toEqual(expectedActions);
  });
})

describe('set current user actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles SET_CURRENT_USER to log in a user', () => {
    let user = users[0];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {user}
      });
    });
    const expectedActions = [{ type: types.SET_CURRENT_USER, user }];
    const store = mockStore({ user: [] });
    return store.dispatch(registerUser(user, [])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
})