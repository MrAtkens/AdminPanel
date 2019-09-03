import {
    GET_USERS_SUCCES, GET_USERS_FAILURE,
    DELETE_USERS_SUCCES, DELETE_USERS_FAILURE
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
    users: [],
    isFetching: false,
    status: Boolean,
    error: ""
}

function usersReducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_USERS_SUCCES:
        return { ...state, users: action.payload, isFetching: true, status: Boolean } 
      case GET_USERS_FAILURE:
          toastError()
        return { ...state, error: action.payload.message, isFetching: false, status: false }

      case DELETE_USERS_SUCCES:
          toastSucces()
          reloadPage()
        return { ...state, status: action.payload }
      case DELETE_USERS_FAILURE:
          toastError()
        return { ...state, error: action.payload.message, status: action.payload }

      default:
        return state
    }
  }
  

export default usersReducer