import { fetchNewsApi, fetchNewsByIdApi, addNewsApi, editNewsApi, deleteNewsApi } from '../../API'
import {GET_NEWS_START, GET_NEWS_SUCCES, GET_NEWS_FAILURE,
GET_NEWS_BY_ID_START, GET_NEWS_BY_ID_SUCCES, GET_NEWS_BY_ID_FAILURE,
ADD_NEWS_START, ADD_NEWS_SUCCES, ADD_NEWS_FAILURE,
EDIT_NEWS_START, EDIT_NEWS_SUCCES, EDIT_NEWS_FAILURE,
DELETE_NEWS_START, DELETE_NEWS_SUCCES, DELETE_NEWS_FAILURE
 } from '../../actionType'

export const fetchNews = () => async dispatch => {
    dispatch({type: GET_NEWS_START})

  try {
    const products = await fetchNewsApi()
  
    dispatch({
      type: GET_NEWS_SUCCES,
      payload: products
    })
  } catch (err) {
    dispatch({
      type: GET_NEWS_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const fetchNewsById = (id) => async dispatch => {
  dispatch({type: GET_NEWS_BY_ID_START})

try {
  const blog = await fetchNewsByIdApi(id)

  dispatch({
    type: GET_NEWS_BY_ID_SUCCES,
    payload: blog
  })
} catch (err) {
  dispatch({
    type: GET_NEWS_BY_ID_FAILURE,
    payload: err,
    error: true
  })
}
}

export const addNews = (newNews) => async dispatch => {
  dispatch({type: ADD_NEWS_START})

try {
  const status = await addNewsApi(newNews)

  dispatch({
    type: ADD_NEWS_SUCCES,
    payload: status
  })
} catch (err) {
  dispatch({
    type: ADD_NEWS_FAILURE,
    payload: err,
    error: true
  })
}
}

export const editNews = (id, newData) => async dispatch => {
  dispatch({type: EDIT_NEWS_START})

try {
  const status = await editNewsApi(id, newData)

  dispatch({
    type: EDIT_NEWS_SUCCES,
    payload: status
  })
} catch (err) {
  dispatch({
    type: EDIT_NEWS_FAILURE,
    payload: err,
    error: true
  })
}
}

export const deleteNews = (id) => async dispatch => {
  dispatch({type: DELETE_NEWS_START})

  try {
    const status = await deleteNewsApi(id)
  
    dispatch({
      type: DELETE_NEWS_SUCCES,
      payload: status
    })
  } catch (err) {
    dispatch({
      type: DELETE_NEWS_FAILURE,
      payload: false,
    })
}
}
 