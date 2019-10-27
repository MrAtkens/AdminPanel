import {
    GET_PRODUCT_SUCCES, GET_PRODUCT_FAILURE,
    ADD_PRODUCT_SUCCES, ADD_PRODUCT_FAILURE,
    EDIT_PRODUCT_SUCCES, EDIT_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCES, DELETE_PRODUCT_FAILURE
} from '../../actionType'

import { toast } from 'react-toastify'

const reloadPage = () => {
  setTimeout(window.location.reload(), 6000)
}

const toastSucces = (text) => {
  toast.success(text, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
}

const toastError = (text) => {
  toast.error(text , {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });  
}

const initialState = {
    products: [],
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
        return { ...state, error: action.payload.message, isFetching: false, status: false }

      case ADD_PRODUCT_SUCCES:
          toastSucces("Вы успешно добавили продукт")
          reloadPage()
        return { ...state, status: action.payload }
      case ADD_PRODUCT_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, status: action.payload }

      case EDIT_PRODUCT_SUCCES:
          toastSucces("Продукт редактирован успешно")
          reloadPage()
        return { ...state, status: action.payload}
      case EDIT_PRODUCT_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, status: action.payload }  

      case DELETE_PRODUCT_SUCCES:
          toastSucces("Продукт удалён успешно")
          reloadPage()
        return { ...state, status: action.payload }
      case DELETE_PRODUCT_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, status: action.payload }

      default:
        return state
    }
  }
  

export default productsReducer