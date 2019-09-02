import {
    GET_CATEGORIES_SUCCCES, GET_CATEGORIES_FAILURE,
    ADD_CATEGORIE_SUCCES, ADD_CATEGORIE_FAILURE,
    DELETE_CATEGORIE_SUCCES, DELETE_CATEGORIE_FAILURE
} from '../../actionType'

import { toast } from 'react-toastify'

const toastSucces = () => {
  toast.success("Всё прошло успешно", {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
}

const toastError = () => {
  toast.error("Произошла ошибка пожалуйста попробуйте позже" , {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });  
}

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
          toastError()
        return { ...state, error: action.payload.message, isFetching: false, status: false }

      case ADD_CATEGORIE_SUCCES:
          toastSucces()
        return { ...state, status: action.payload }
      case ADD_CATEGORIE_FAILURE:
          toastError()
        return { ...state, error: action.payload.message, status: action.payload }

      case DELETE_CATEGORIE_SUCCES:
          toastSucces()
        return { ...state, status: action.payload }
      case DELETE_CATEGORIE_FAILURE:
          toastError()
        return { ...state, error: action.payload.message, status: action.payload }

      default:
        return state
    }
  }
  

export default categoriesReducer