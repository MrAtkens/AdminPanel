import { fetchCategoriesApi, addCategorieApi, editCategorieApi, deleteCategorieApi } from '../../API'
import {GET_CATEGORIES_START, GET_CATEGORIES_SUCCCES, GET_CATEGORIES_FAILURE,
  ADD_CATEGORIE_START,ADD_CATEGORIE_SUCCES, ADD_CATEGORIE_FAILURE,
  EDIT_CATEGORIE_START, EDIT_CATEGORIE_SUCCES, EDIT_CATEGORIE_FAILURE,
  DELETE_CATEGORIE_START, DELETE_CATEGORIE_SUCCES, DELETE_CATEGORIE_FAILURE} from '../../actionType'

export const fetchCategories = () => async dispatch => {
    dispatch({type: GET_CATEGORIES_START})

  try {
    const categories = await fetchCategoriesApi()
  
    dispatch({
      type: GET_CATEGORIES_SUCCCES,
      payload: categories
    })
  } catch (err) {
    dispatch({
      type: GET_CATEGORIES_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const addCategorie = (categorie) => async dispatch => {
  dispatch({type: ADD_CATEGORIE_START})

  try {
    const status = await addCategorieApi(categorie)
  
    dispatch({
      type: ADD_CATEGORIE_SUCCES,
      payload: status
    })
  } catch (err) {
    dispatch({
      type: ADD_CATEGORIE_FAILURE,
      payload: false,
    })
}
}

export const editCategorie = (id, newData) => async dispatch => {
  dispatch({type: EDIT_CATEGORIE_START})

  try {
    const status = await editCategorieApi(id, newData)
  
    dispatch({
      type: EDIT_CATEGORIE_SUCCES,
      payload: status
    })
  } catch (err) {
    dispatch({
      type: EDIT_CATEGORIE_FAILURE,
      payload: false,
    })
}
}

export const deleteCategorie = (id) => async dispatch => {
  dispatch({type: DELETE_CATEGORIE_START})

  try {
    const status = await deleteCategorieApi(id)
  
    dispatch({
      type: DELETE_CATEGORIE_SUCCES,
      payload: status.status
    })
  } catch (err) {
    dispatch({
      type: DELETE_CATEGORIE_FAILURE,
      payload: false,
    })
}
}