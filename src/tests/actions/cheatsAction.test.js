import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import { getAllCheats, addCategory, deleteCategory, editCategory, addCheat} from '../../actions/cheatsAction';
import * as types from '../../actions/actionTypes';
import categories from '../__mocks__/categoriesData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetch categories actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles GET_CHEATS_SUCCESS after get cheats', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          categories
        }
      });
    });
    const expectedActions = [
      { type: types.GET_CHEATS_SUCCESS, categories }
    ];
    const store = mockStore({categories: []});
    return store.dispatch(getAllCheats()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('add Category actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles ADD_CATEGORY_SUCCESS after adding grocery', () => {
    let category = categories[0]
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          category
        }
      });
    });
    const expectedActions = [
      { type: types.ADD_CATEGORY_SUCCESS, category }
    ];
    const store = mockStore({category: {}});
    return store.dispatch(addCategory(category)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('delete Category actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles DELETE_CATEGORY_SUCCESS after deleting grocery', () => {
    const categoryId = 3
    const message = "Grocery has been deleted"
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message
        }
      });
    });
    const expectedActions = [
      { type: types.DELETE_CATEGORY_SUCCESS, categoryId }
    ];
    const store = mockStore({category: {}});
    return store.dispatch(deleteCategory(categoryId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('edit Category actions', () => {
  let category = categories[0]
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles MODIFY_CATEGORY_SUCCESS after buying grocery', () => {
    const message = "Grocery has been successfully purchased"
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message,
          category
        }
      });
    });
    const expectedActions = [
      { type: types.MODIFY_CATEGORY_SUCCESS, category }
    ];
    const store = mockStore({grocery: {}});
    return store.dispatch(editCategory(category)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('add Cheat actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles ADD_CHEAT_SUCCESS after buying grocery', () => {
    let cheatDetails = categories[0]
    const message = "Grocery has been successfully modified"
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message,
          cheatDetails
        }
      });
    });
    const expectedActions = [
      { type: types.ADD_CHEAT_SUCCESS, cheatDetails }
    ];
    const store = mockStore({cheatDetails: {}});
    return store.dispatch(addCheat(cheatDetails)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});