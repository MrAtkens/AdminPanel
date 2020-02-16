import {
    GET_PRODUCT_SUCCES, GET_PRODUCT_FAILURE,
    ADD_PRODUCT_SUCCES, ADD_PRODUCT_FAILURE,
    EDIT_PRODUCT_SUCCES, EDIT_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCES, DELETE_PRODUCT_FAILURE,
    PRODUCT_TRANSFER_TO_ANOTHER_PAGE
} from '../../actionType'

import { toastSucces, toastError } from '../toast'

const initialState = {
    products: [],
    product: {},
    isFetching: false,
    status: Boolean,
    error: ""
}

function productsReducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_PRODUCT_SUCCES:
        return { ...state, products: action.payload, isFetching: true, status: Boolean } 
      case GET_PRODUCT_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, isFetching: false, status: Boolean }

      case ADD_PRODUCT_SUCCES:
          toastSucces("Вы успешно добавили продукт")
          window.location.replace("http://localhost:3001/products");
        return { ...state, status: action.payload.status }
      case ADD_PRODUCT_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
          window.location.reload()
        return { ...state, error: action.payload.message, status: Boolean }

      case EDIT_PRODUCT_SUCCES:
          toastSucces("Продукт редактирован успешно")
        return { ...state, status: action.payload.status }
      case EDIT_PRODUCT_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, status: Boolean }  

      case DELETE_PRODUCT_SUCCES:
          toastSucces("Продукт удалён успешно")
          window.location.reload()
        return { ...state, status: action.payload.status }
      case DELETE_PRODUCT_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, status: Boolean }

      case PRODUCT_TRANSFER_TO_ANOTHER_PAGE:
        return { ...state, product: action.payload}

      default:
        return state
    }
  }
  

export default productsReducer