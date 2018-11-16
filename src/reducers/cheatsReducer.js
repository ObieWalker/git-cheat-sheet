import * as types from '../actions/actionTypes';
import initialState from './initialState'

// let newState, itemIndex

export default function groceriesReducer(state = initialState.cheats, action) {
  switch (action.type) {
    case types.GET_CHEATS_SUCCESS:
      return action.cheats;


    default: 
      return state;
  }
}