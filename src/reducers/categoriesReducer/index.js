import {
    GET_CATEGORIES_SUCCCES, GET_CATEGORIES_FAILURE,
    ADD_CATEGORIE_SUCCES, ADD_CATEGORIE_FAILURE,
    EDIT_CATEGORIE_SUCCES, EDIT_CATEGORIE_FAILURE,
    DELETE_CATEGORIE_SUCCES, DELETE_CATEGORIE_FAILURE
} from '../../actionType'

import { toastSucces, toastError } from '../toast'


const initialState = {
    categories: [],
    isFetching: false,
    status: Boolean,
    error: ""
}

function categoriesReducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_CATEGORIES_SUCCCES:
        return { ...state, categories: action.payload, isFetching: true, status: Boolean } 
      case GET_CATEGORIES_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, isFetching: false, status: Boolean }

      case ADD_CATEGORIE_SUCCES:
          toastSucces("Категория добавлена успешно")
        return { ...state, status: action.payload.status }
      case ADD_CATEGORIE_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, status: Boolean }

      case EDIT_CATEGORIE_SUCCES:
          toastSucces("Категория изменина успешно")
        return { ...state, status: action.payload.status }
      case EDIT_CATEGORIE_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, status: Boolean }

      case DELETE_CATEGORIE_SUCCES:
          toastSucces("Категория удалена успешна")
        return { ...state, status: action.payload.status }
      case DELETE_CATEGORIE_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, status: Boolean }

      default:
        return state
    }
  }
  

export default categoriesReducer