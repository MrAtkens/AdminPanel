import {
    GET_MAIL_SUCCES, GET_MAIL_FAILURE,
    DELETE_MAIL_SUCCES, DELETE_MAIL_FAILURE
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
    mails: [],
    isFetching: false,
    status: Boolean,
    error: ""
}

function mailsReducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_MAIL_SUCCES:
        return { ...state, mails: action.payload, isFetching: true, status: Boolean } 
      case GET_MAIL_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, isFetching: false, status: false }

      case DELETE_MAIL_SUCCES:
          toastSucces("Сообщение удалено успешно")
          reloadPage()
        return { ...state, status: action.payload }
      case DELETE_MAIL_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, status: action.payload }

      default:
        return state
    }
  }
  

export default mailsReducer