import * as types from './actionTypes';
import axios from 'axios';
import toastr from 'toastr';


export const getCheatsSuccess = categories => {
  return {
    type: types.GET_CHEATS_SUCCESS,
    categories
  }
}

export const addCheatSuccess = cheatDetails => {
  return {
    type: types.ADD_CHEAT_SUCCESS,
    cheatDetails
  }
}

export const addCategorySuccess = category => {
  return {
    type: types.ADD_CATEGORY_SUCCESS,
    category
  }
}

export const deleteCategorySuccess = categoryId => {
  return {
    type: types.DELETE_CATEGORY_SUCCESS,
    categoryId
  }
}

export const editCategorySuccess = category => {
  return {
    type: types.MODIFY_CATEGORY_SUCCESS,
    category
  }
}

export const deleteCheatSuccess = (cheatId, categoryId) => {
  return {
    type: types.DELETE_CHEAT_SUCCESS,
    cheatId,
    categoryId
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
  .catch((error) => { 
    toastr.error("Unable to get cheats, Please reload!!!") 
    console.log(error) });
}

export const addCategory = (category) => (dispatch) => {
  if (axios.defaults.headers.common.token === '') {
    axios.defaults.headers.common.token = localStorage.getItem('token');
  }
  return axios({
    method: 'POST',
    url: '/api/v1/category',
    headers: {
      token: localStorage.getItem('token')
    },
    data: category
  })
  .then(response => {
    toastr.success(response.data.message)
    dispatch(addCategorySuccess(response.data.category))
  })
  .catch((error) => {
    toastr.error(error.response.data.message) 
  });
}

export const deleteCategory = (categoryId) => (dispatch) => {
  if (axios.defaults.headers.common.token === '') {
    axios.defaults.headers.common.token = localStorage.getItem('token');
  }
  return axios({
    method: 'DELETE',
    url: `/api/v1/category/${categoryId}`,
    headers: {
      token: localStorage.getItem('token')
    },
  })
  .then(response => {
    toastr.success(response.data.message)
    dispatch(deleteCategorySuccess(categoryId))
  })
  .catch((error) => {
    toastr.error(error.response.data.message) 
  });
}

export const deleteCheat = (cheatId, categoryId) => (dispatch) => {
  if (axios.defaults.headers.common.token === '') {
    axios.defaults.headers.common.token = localStorage.getItem('token');
  }
  return axios({
    method: 'DELETE',
    url: `/api/v1/cheats/${cheatId}`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {categoryId}
  })
  .then(response => {
    const { cheatId, categoryId } = response.data.cheatDetails
    toastr.success(response.data.message)
    dispatch(deleteCheatSuccess(cheatId, categoryId))
  })
  .catch((error) => {
    toastr.error(error.response.data.message) 
  });
}

export const editCategory = (id, category) => (dispatch) => {
  if (axios.defaults.headers.common.token === '') {
    axios.defaults.headers.common.token = localStorage.getItem('token');
  }
  return axios({
    method: 'PATCH',
    url: `/api/v1/category/${id}`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {category}
  })
  .then(response => {
    toastr.success(response.data.message)
    dispatch(editCategorySuccess(response.data.category))
  })
  .catch((error) => {
    toastr.error(error.response.data.message) 
  });
}

export const addCheat = (id, cheat) => (dispatch) => {
  if (axios.defaults.headers.common.token === '') {
    axios.defaults.headers.common.token = localStorage.getItem('token');
  }
  return axios({
    method: 'POST',
    url: '/api/v1/cheats',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {cheat, id}
  })
  .then(response => {
    toastr.success(response.data.message)
    dispatch(addCheatSuccess(response.data.cheatDetails))
  })
  .catch((error) => {
    toastr.error(error.response.data.message) 
  });
}