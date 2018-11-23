/*eslint-disable */
import expect from 'expect';
import isEmpty from 'lodash/isEmpty';
import cheatsReducer from '../../reducers/cheatsReducer';
import * as types from '../../actions/actionTypes';
import categories from '../__mocks__/categoriesData';
import addedCategories from '../__mocks__/addedCategories';
import mockCheats from '../__mocks__/mockCheats';

describe('Get cheats', () => {
  const initialState = {
    cheats: [],
  }
  const state = categories;

  it('should return the initial state', () => {
    expect(cheatsReducer(undefined, {})).toEqual(initialState.cheats);
  });

  it('should handle GET_CHEATS_SUCCESS', () => {
    const getCheats = {
      type: types.GET_CHEATS_SUCCESS,
      categories
    };
    expect(cheatsReducer({}, getCheats)).toEqual(
      categories
    );
  });
})

describe('Add category', () => {
  const initialState = {
    cheats: [],
  }
  const state = categories;
  it('should handle GET_CHEATS_SUCCESS', () => {
    const category = categories[0]
    const addCategory = {
      type: types.ADD_CATEGORY_SUCCESS,
      category
    };
    expect(cheatsReducer(state, addCategory)).toEqual(
      addedCategories
    );
  });
})

describe('delete category', () => {
  const initialState = {
    cheats: [],
  }
  const state = categories;
  it('should handle DELETE_CATEGORY_SUCCESS', () => {
    const categoryId = 5
    const category = categories[0]
    const deleteCategory = {
      type: types.DELETE_CATEGORY_SUCCESS,
      categoryId
    };
    expect(cheatsReducer(state, deleteCategory)).toEqual(
      categories
    );
  });
})

describe('modify category', () => {
  const initialState = {
    cheats: [],
  }
  const state = categories;
  it('should handle MODIFY_CATEGORY_SUCCESS', () => {
    const categoryId = 5
    const category = categories[0]
    const modifiedCategory = {
      type: types.MODIFY_CATEGORY_SUCCESS,
      category
    };
    expect(cheatsReducer(state, modifiedCategory)).toEqual(
      categories
    );
  });
})

describe('add cheat', () => {
  const initialState = {
    cheats: [],
  }
  const state = mockCheats;
  it('should handle ADD_CHEAT_SUCCESS', () => {
    const categoryId = 5
    const cheatDetails = categories[0]
    const addCheat = {
      type: types.ADD_CHEAT_SUCCESS,
      cheatDetails
    };
    expect(cheatsReducer(state, addCheat)).toEqual(
      mockCheats
    );
  });
})

describe('delete cheat', () => {
  const initialState = {
    cheats: [],
  }
  const state = mockCheats;
  it('should handle DELETE_CHEAT_SUCCESS', () => {
    const cheatId = 5
    const cheatDetails = categories[0]
    const deleteCheat = {
      type: types.DELETE_CHEAT_SUCCESS,
      cheatId
    };
    expect(cheatsReducer(state, deleteCheat)).toEqual(
      mockCheats
    );
  });
})