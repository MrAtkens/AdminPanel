import {
    GET_MAIL_SUCCES, GET_MAIL_FAILURE,
    DELETE_MAIL_SUCCES, DELETE_MAIL_FAILURE
} from '../../actionType'

import { toastSucces, toastError } from '../toast'

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
        return { ...state, error: action.payload.message, isFetching: false, status: Boolean }

      case DELETE_MAIL_SUCCES:
          toastSucces("Сообщение удалено успешно")
        return { ...state, status: true }
      case DELETE_MAIL_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message, status: Boolean }

      default:
        return state
    }
  }
  

export default mailsReducer