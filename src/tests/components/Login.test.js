import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import connect, { Login } from '../../components/Login';
let mountedLogin;
let props;
const locations = [];
const history = {
  push(location) {
    locations.push(location);
  }
};

const user = { isAuthenticated: false, user: {} };
const authenticateUser = jest.fn(() => Promise.resolve());
const mockStore = configureStore();
let wrapper;

const getComponent = () => {
  if (!mountedLogin) {
    props = {
      user,
      authenticateUser
    };
    history.push = jest.fn();
    mountedLogin = shallow(<Login {...props} />);
  }
  return mountedLogin;
};

describe('Login Component', () => {
  beforeEach(() => {});

  it('renders component successfully', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('updates state on input change', () => {
    wrapper.find('#email').simulate('change', {
      target: { name: 'email', value: 'randomEmail@gmail.com' }
    });
    expect(wrapper.state().email).toBe('randomEmail@gmail.com');
  });

  it('updates state on input change', () => {
    wrapper.find('#password').simulate('change', {
      target: { name: 'password', value: 'password' }
    });
    expect(wrapper.state().password).toBe('password');
  });


  it('testing user login function', () => {
    wrapper = getComponent();
    const e = { preventDefault: () => undefined };
    e.preventDefault = jest.fn();
    wrapper.instance().handleUserLogin(e);
    expect(e.preventDefault).toHaveBeenCalled();
  });
  it('testing user login function', () => {
    wrapper = getComponent();
    wrapper.setProps({
      user : { isAuthenticated: true}
    })
  });
});
describe('Connected Component', () => {
  describe('Connected mountedLogin', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        authenticateUser
      });
      wrapper = shallow(<connect store={store} history={history} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
