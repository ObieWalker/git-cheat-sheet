import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import connect, { Register } from '../../components/Register';

let mountedRegister;
let props;
const locations = [];
const history = {
  push(location) {
    locations.push(location);
  }
};

const registerUserAction = jest.fn(() => Promise.resolve());
const mockStore = configureStore();
let wrapper;
const registerUser = {
  registerUserError: ''
};

const getComponent = () => {
  if (!mountedRegister) {
    props = {
      registerUserAction,
      history,
      registerUser
    };
    history.push = jest.fn();
    mountedRegister = shallow(<Register {...props} />);
  }
  return mountedRegister;
};

describe('Register Component', () => {
  beforeEach(() => {});
  wrapper = getComponent();

  it('renders component successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('updates state on input change', () => {
    wrapper.find('#username').simulate('change', {
      target: { name: 'username', value: 'obiwalker' }
    });
    expect(wrapper.state().username).toBe('obiwalker');
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
  it('updates state on input change', () => {
    wrapper.find('#password2').simulate('change', {
      target: { name: 'verifyPassword', value: 'password' }
    });
    expect(wrapper.state().verifyPassword).toBe('password');
  });

  it('testing user login function', () => {
    wrapper = getComponent();
    const e = { preventDefault: () => undefined };
    e.preventDefault = jest.fn();
    wrapper.instance().onSubmit(e);
    expect(e.preventDefault).toHaveBeenCalled();
  });
});
describe('Connected Component', () => {
  describe('Connected mountedRegister', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        registerUserAction
      });
      wrapper = shallow(<connect store={store} history={history} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
