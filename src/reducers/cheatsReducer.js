import * as types from '../actions/actionTypes';
import initialState from './initialState'

let newState, categoryIndex

export default function groceriesReducer(state = initialState.cheats, action) {
  switch (action.type) {
    case types.GET_CHEATS_SUCCESS:
      return action.categories;

    case types.ADD_CATEGORY_SUCCESS:
      return [
      ...state, Object.assign({}, action.category)
      ]

    case types.DELETE_CATEGORY_SUCCESS:
      return [
        ...state.filter(category => category._id !== action.categoryId)
      ];
    
    case types.MODIFY_CATEGORY_SUCCESS:
      newState =  [...state];
      categoryIndex = newState.findIndex(category => category._id === action.category._id);
      newState = [
        ...newState.slice(0, categoryIndex),
        action.category,
        ...newState.slice(
          categoryIndex + 1,
          newState.length
        )
      ];
      return newState;

    case types.ADD_CHEAT_SUCCESS:
      newState =  [...state];
      categoryIndex = state.findIndex(category => category._id === action.cheatDetails.categoryId);
      newState[categoryIndex].command.push(action.cheatDetails)
      newState = [
        ...newState.slice(0, categoryIndex),
        newState[categoryIndex],
        ...newState.slice(
          categoryIndex + 1,
          newState.length
        )
      ]
      return newState

    default: 
      return state;
  }
}