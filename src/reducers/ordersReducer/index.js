import {
    GET_ORDERS_SUCCES, GET_ORDERS_FAILURE,
    ACCEPT_ORDERS_SUCCES, ACCEPT_ORDERS_FAILURE, 
    DELETE_ORDERS_SUCCES, DELETE_ORDERS_FAILURE
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
          toastError()
        return { ...state, error: action.payload.message, isFetching: false, status: false }

      case ACCEPT_ORDERS_SUCCES:
        return { ...state, status: action.payload }
      case ACCEPT_ORDERS_FAILURE:
        return { ...state, error: action.payload.message, status: action.payload }
    
      case DELETE_ORDERS_SUCCES:
          toastSucces()
          reloadPage()
        return { ...state, status: action.payload }
      case DELETE_ORDERS_FAILURE:
          toastError()
        return { ...state, error: action.payload.message, status: action.payload }

      default:
        return state
    }
  }
  

export default ordersReducer