import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import connect, { LandingPage } from '../../components/LandingPage';
let mountedLogin;
let props;
const locations = [];
const history = {
  push(location) {
    locations.push(location);
  }
};
const command = "$ git checkout to there"

const userData = { isAuthenticated: false, user: {} };
const getAllCheats = jest.fn(() => Promise.resolve());
const addCategory = jest.fn(() => Promise.resolve());
const deleteCategory = jest.fn(() => Promise.resolve());
const deleteCheat = jest.fn(() => Promise.resolve());
const editCategory = jest.fn(() => Promise.resolve());
const addCheat = jest.fn(() => Promise.resolve());
const logOut = jest.fn(() => Promise.resolve());
const mockStore = configureStore();
let wrapper;
const cheats = {
  name: "A name",
  _id: 1211
}
const category = {
  name: 'random'
}

const getComponent = () => {
  if (!mountedLogin) {
    props = {
      userData,
      getAllCheats,
      addCategory,
      deleteCategory,
      deleteCheat,
      editCategory,
      addCheat, 
      logOut,
      history
    };
    history.push = jest.fn();
    mountedLogin = shallow(<LandingPage {...props} />);
  }
  return mountedLogin;
};

describe('Landing page Component', () => {
  beforeEach(() => {});
  wrapper = getComponent();

  it('renders component successfully', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });
  describe('Check functions are called', () => {
    it('should have a method handleLogOut', () => {
      expect(wrapper.instance().handleLogOut).toBeDefined();
    });
    it('should have a method that addCategory', () => {
      expect(wrapper.instance().addCategory).toBeDefined();
    });
    it('should have a method that addCheat', () => {
      expect(wrapper.instance().addCheat).toBeDefined();
    });
    it('should have a method that editCategory', () => {
      expect(wrapper.instance().editCategory).toBeDefined();
    });
    it('should have a method that deleteCategory', () => {
      expect(wrapper.instance().deleteCategory).toBeDefined();
    });
    it('should have a method that deleteCheat', () => {
      expect(wrapper.instance().deleteCheat).toBeDefined();
    });
    it('should have a method that handleHide', () => {
      expect(wrapper.instance().handleHide).toBeDefined();
    });
    it('should have a method that cheatModalOnHide', () => {
      expect(wrapper.instance().cheatModalOnHide).toBeDefined();
    });
    it('should have a method that cheatModalShow', () => {
      expect(wrapper.instance().cheatModalShow).toBeDefined();
    });
    it('should have a method that modalShow', () => {
      expect(wrapper.instance().modalShow).toBeDefined();
    });
    it('should have a method that updateDetails', () => {
      expect(wrapper.instance().updateDetails).toBeDefined();
    });
    it('should have a method that updateSearch', () => {
      expect(wrapper.instance().updateSearch).toBeDefined();
    });
    it('should have a method that onCopy', () => {
      expect(wrapper.instance().onCopy).toBeDefined();
    });
    it('should have a method that editformIsValid', () => {
      expect(wrapper.instance().editformIsValid).toBeDefined();
    });
    it('should have a method that addCategoryformIsValid', () => {
      expect(wrapper.instance().addCategoryformIsValid).toBeDefined();
    });
    it('should have a method that addCheatformIsValid', () => {
      expect(wrapper.instance().addCheatformIsValid).toBeDefined();
    });
  })

  describe('Checks state change', () => {
    it('should have a method handleHide', () => {
      wrapper = getComponent();
      wrapper.instance().handleHide();
      expect(wrapper.state().show).toEqual(false);
      expect(wrapper.state().categoryTitle).toEqual('');
      expect(wrapper.state().description).toEqual('');
      expect(wrapper.state().command).toEqual('');
      expect(wrapper.state().category).toEqual({});
      expect(wrapper.state().errors).toEqual({});
    });
    it('should have a method cheatModalOnHide', () => {
      wrapper = getComponent();
      wrapper.instance().cheatModalOnHide();
      expect(wrapper.state().cheatModalShow).toEqual(false);
      expect(wrapper.state().description).toEqual('');
      expect(wrapper.state().command).toEqual('');
      expect(wrapper.state().keywords).toEqual('');
      expect(wrapper.state().errors).toEqual({});
    });
    it('should have a method cheatModalShow', () => {
      wrapper = getComponent();
      wrapper.instance().cheatModalShow(cheats);
      expect(wrapper.state().cheatModalShow).toEqual(true);
      expect(wrapper.state().categoryTitle).toEqual('A name');
      expect(wrapper.state().category.id).toEqual(1211);
    });
    it('should have a method modalShow', () => {
      wrapper = getComponent();
      wrapper.instance().modalShow(category);
      expect(wrapper.state().category).toEqual(category);
      expect(wrapper.state().show).toEqual(true);
    });
    it('should click on on show', () => {
      wrapper = getComponent();
      wrapper
      .find('.btn-primary')
      .simulate('click');
      expect(wrapper.state().show).toEqual(true);
    });  
    it('should have a method handleLogOut', () => {
      wrapper = getComponent();
      const e = { preventDefault: () => undefined };
      e.preventDefault = jest.fn();
      wrapper.instance().handleLogOut(e);
      expect(e.preventDefault).toHaveBeenCalled();
    });
    it('should have a method addCategory', () => {
      wrapper = getComponent();
      wrapper.setState({
        categoryTitle: 'Center Place',
        userData: {
          user: {
            id: 1222
          }
        }
      });
      const e = { preventDefault: () => undefined };
      e.preventDefault = jest.fn();
      wrapper.instance().addCategory(e);
      expect(wrapper.state().show).toEqual(true);
    });
    it('should have a method updateSearch', () => {
      wrapper = getComponent();
      wrapper.setState({
        search: 'Cent',
      });
      const e = { 
        preventDefault: () => undefined,
        target: {
          name: 'Center Place'
        }
       };
      e.preventDefault = jest.fn();
      wrapper.instance().updateSearch(e);
      expect(wrapper.state().search).toEqual('Cent');
    });
    it('should have a method updateDetails', () => {
      wrapper = getComponent();
      wrapper.setState({
        categoryTitle: 'Center Place',
      });
      const e = { 
        preventDefault: () => undefined,
        target: {
          name: 'Center Place'
        }
       };
      e.preventDefault = jest.fn();
      wrapper.instance().updateDetails(e);
      expect(wrapper.state().categoryTitle).toEqual('Center Place');
    });
    it('should have a method addCheat', () => {
      wrapper = getComponent();
      wrapper.setState({
        command: 'Center Place',
        description: 'random description',
        keywords: 'blank',
      });
      wrapper.instance().addCheat();
      expect(wrapper.state().cheatModalShow).toEqual(true);
    });
    it('should have a method editCategory', () => {
      wrapper = getComponent();
      wrapper.setState({
        categoryTitle: 'Center Place',
        userData: {
          user: {
            id: 1222
          }
        }
      });
      wrapper.instance().editCategory();
      expect(wrapper.state().show).toEqual(false);
    });
    it('should have a method deleteCategory', () => {
      wrapper = getComponent();
      wrapper.setState({
        categoryTitle: 'Center Place'
      });
      wrapper.instance().deleteCategory();
    });
    it('should have a method deleteCheat', () => {
      wrapper = getComponent();
      wrapper.instance().deleteCheat();
    });
    it('should have a method editformIsValid', () => {
      wrapper = getComponent();
      wrapper.setState({
        categoryTitle: ''
      });
      wrapper.instance().editformIsValid();
      expect(wrapper.state().errors).toEqual({"categoryTitle": "There must be valid change to the category title."});
    });
    it('should have a method addCategoryformIsValid', () => {
      wrapper = getComponent();
      wrapper.setState({
        categoryTitle: ''
      });
      wrapper.instance().addCategoryformIsValid();
      expect(wrapper.state().errors).toEqual({"categoryTitle": "The Category title cannot be empty."});
    });
    it('should have a method addCheatformIsValid', () => {
      wrapper = getComponent();
      wrapper.setState({
        description: ''
      });
      wrapper.instance().addCheatformIsValid();
      expect(wrapper.state().errors).toEqual({
        "description": "There must be a description.",
        "command": "Command cannot be empty.",
      });
    });
  })
})

describe('Connected Component', () => {
  describe('Connected mountedLanding page', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        userData,
        getAllCheats,
        addCategory,
        deleteCategory,
        deleteCheat,
        editCategory,
        addCheat, 
        logOut
      });
      wrapper = shallow(<connect 
        store={store} 
        history={history}
        getAllCheats={getAllCheats}
        addCategory={addCategory}
        deleteCategory={deleteCategory}
        deleteCheat={deleteCheat}
        editCategory={editCategory}
        addCheat={addCheat}
        logOut={logOut}
        />);
      expect(wrapper.length).toBe(1);
    });
  });
});
