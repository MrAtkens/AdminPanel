import {
  GET_NEWS_SUCCES, GET_NEWS_FAILURE,
  GET_NEWS_BY_ID_SUCCES, GET_NEWS_BY_ID_FAILURE,
  ADD_NEWS_SUCCES, ADD_NEWS_FAILURE,
  EDIT_NEWS_SUCCES, EDIT_NEWS_FAILURE,
  DELETE_NEWS_SUCCES, DELETE_NEWS_FAILURE,
} from '../../actionType'

import { toastSucces, toastError } from '../toast'

const initialState = {
  news: [],
  blog: {},
  isFetching: false,
  status: Boolean,
  error: ""
}

function newsReducer(state = initialState, action) {
  switch (action.type) {

    case GET_NEWS_SUCCES:
      return { ...state, news: action.payload, isFetching: true, status: Boolean } 
    case GET_NEWS_FAILURE:
        toastError("Произошла ошибка пожалуйста попробуйте позже")
      return { ...state, error: action.payload.message, isFetching: false, status: Boolean }

    case GET_NEWS_BY_ID_SUCCES:
      return { ...state, blog: action.payload, status: true } 
    case GET_NEWS_BY_ID_FAILURE:
        toastError("Произошла ошибка пожалуйста попробуйте позже")
      return { ...state, error: action.payload.message }

    case ADD_NEWS_SUCCES:
        toastSucces("Вы успешно добавили статью")
        window.location.replace("http://localhost:3001/news/add");
      return { ...state, status: action.payload.status }
    case ADD_NEWS_FAILURE:
        toastError("Произошла ошибка пожалуйста попробуйте позже")
        window.location.reload()
      return { ...state, error: action.payload.message, status: Boolean }

    case EDIT_NEWS_SUCCES:
        toastSucces("Статья редактирован успешно")
      return { ...state, status: action.payload.status }
    case EDIT_NEWS_FAILURE:
        toastError("Произошла ошибка пожалуйста попробуйте позже")
      return { ...state, error: action.payload.message, status: Boolean }  

    case DELETE_NEWS_SUCCES:
        toastSucces("Статья удалён успешно")
        window.location.reload()
      return { ...state, status: action.payload.status }
    case DELETE_NEWS_FAILURE:
        toastError("Произошла ошибка пожалуйста попробуйте позже")
      return { ...state, error: action.payload.message, status: Boolean }

    default:
      return state
  }
}


export default newsReducer