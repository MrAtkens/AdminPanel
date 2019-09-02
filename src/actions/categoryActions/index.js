import { fetchCategoriesApi, addCategorieApi, deleteCategorieApi } from '../../API'
import {GET_CATEGORIES_START, GET_CATEGORIES_SUCCCES, GET_CATEGORIES_FAILURE,
  ADD_CATEGORIE_START,ADD_CATEGORIE_SUCCES, ADD_CATEGORIE_FAILURE,
  DELETE_CATEGORIE_START, DELETE_CATEGORIE_SUCCES, DELETE_CATEGORIE_FAILURE} from '../../actionType'

export const fetchCategories = () => async dispatch => {
    dispatch({type: GET_CATEGORIES_START})

  try {
    const categories = await fetchCategoriesApi()
    console.log("ACTION:"+categories)
  
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
    console.log("ACTION:"+status)
  
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

export const deleteCategorie = (id) => async dispatch => {
  dispatch({type: DELETE_CATEGORIE_START})

  try {
    const status = await deleteCategorieApi(id)
    console.log("ACTION:"+status.status)
  
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