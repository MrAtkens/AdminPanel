import {
    GET_USERS_SUCCES, GET_USERS_FAILURE,
    SING_IN_SUCCES, SING_IN_FAILURE,
    GET_ACCES_CODE_SUCCES, GET_ACCES_CODE_FAILURE,
    DELETE_USERS_SUCCES, DELETE_USERS_FAILURE, ADMIN_ACCEPT_SUCCES, ADMIN_ACCEPT_FAILURE
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
    users: [],
    disabled: false,
    isFetching: false,
    status: Boolean,
    singUpCodeStatus: Boolean,
    redirectStatus: Boolean,
    error: ""
}

function usersReducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_USERS_SUCCES:
        return { ...state, users: action.payload, isFetching: true, status: Boolean } 
      case GET_USERS_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, isFetching: false, status: false }

      case SING_IN_SUCCES:
          console.log(action.payload.status)
          return { ...state, redirectStatus: action.payload.status, isAccept: true }
        
      case SING_IN_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
          return { ...state, error: action.payload.message }
      
      case GET_ACCES_CODE_SUCCES:
        var isTrue = false
        console.log(action.payload.adminStatus)
          if(action.payload.adminStatus){
            isTrue = true
            toastSucces("Код отправлен")
          }
          else{
            isTrue = true
            toastError("Этот телефон не зарегистрирован")
          }
          return { ...state, singUpCodeStatus: action.payload.adminStatus, disabled: isTrue}

      case GET_ACCES_CODE_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
          return { ...state, error: action.payload.message }

      case ADMIN_ACCEPT_SUCCES:
        return { ...state, redirectStatus: action.payload }
        
      case ADMIN_ACCEPT_FAILURE:
        toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message }

      case DELETE_USERS_SUCCES:
          toastSucces("Удаление прошло успешно")
          reloadPage()
        return { ...state, status: action.payload }
      case DELETE_USERS_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message}

      default:
        return state
    }
  }
  

export default usersReducer