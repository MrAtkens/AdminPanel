import {
    GET_PRODUCT_SUCCES, GET_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCES, DELETE_PRODUCT_FAILURE
} from '../../actionType'

import { toast } from 'react-toastify'

const reloadPage = () => {
  setTimeout(window.location.reload(), 6000)
}

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
          toastError()
        return { ...state, error: action.payload.message, isFetching: false, status: false }

      case DELETE_PRODUCT_SUCCES:
          toastSucces()
          reloadPage()
        return { ...state, status: action.payload }
      case DELETE_PRODUCT_FAILURE:
          toastError()
        return { ...state, error: action.payload.message, status: action.payload }

      default:
        return state
    }
  }
  

export default productsReducer