import * as types from './actionTypes';
import axios from 'axios';
import toastr from 'toastr';


export const getCheatsSuccess = cheats => {
  return {
    type: types.GET_CHEATS_SUCCESS,
    cheats
  }
}



export const getAllCheats = () => (dispatch) => {
  return axios({
    method: 'GET',
    url: '/api/v1/category'
  })
  .then(response => {
    dispatch(getCheatsSuccess(response.data.categories))
  })
  .catch((error) => { console.log(error) });
}