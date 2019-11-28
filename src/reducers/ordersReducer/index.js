import {
    GET_ORDERS_SUCCES, GET_ORDERS_FAILURE,
    ACCEPT_ORDERS_SUCCES, ACCEPT_ORDERS_FAILURE, 
    DELETE_ORDERS_SUCCES, DELETE_ORDERS_FAILURE
} from '../../actionType'

import { toast } from 'react-toastify'

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
    orders: [],
    isFetching: false,
    status: Boolean,
    error: ""
}

function ordersReducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_ORDERS_SUCCES:
        return { ...state, orders: action.payload, isFetching: true, status: Boolean } 
      case GET_ORDERS_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, isFetching: false, status: Boolean }

      case ACCEPT_ORDERS_SUCCES:
          toastSucces("Заказ подтверждён успешно")
        return { ...state, status: action.payload.status }
      case ACCEPT_ORDERS_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, status: Boolean }
    
      case DELETE_ORDERS_SUCCES:
          toastSucces("Заказ удалён успешно")
        return { ...state, status: action.payload.status }
      case DELETE_ORDERS_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, status: Boolean }

      default:
        return state
    }
  }
  

export default ordersReducer