import { fetchMailsApi, deleteSelectedMailsApi  } from '../../API'
import {GET_MAIL_START, GET_MAIL_SUCCES, GET_MAIL_FAILURE,
 DELETE_MAIL_START, DELETE_MAIL_SUCCES, DELETE_MAIL_FAILURE} from '../../actionType'

export const fetchMails = () => async dispatch => {
    dispatch({type: GET_MAIL_START})

  try {
    const mails = await fetchMailsApi()
  
    dispatch({
      type: GET_MAIL_SUCCES,
      payload: mails
    })
  } catch (err) {
    dispatch({
      type: GET_MAIL_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const deleteSelectedMails = (ids) => async dispatch => {
    dispatch({type: DELETE_MAIL_START})

  try{
    console.log(ids)
    const mails = await deleteSelectedMailsApi(ids)
  
    dispatch({
      type: DELETE_MAIL_SUCCES,
      payload: mails
    })
  } catch (err) {
    dispatch({
      type: DELETE_MAIL_FAILURE,
      payload: err,
      error: true
    })
  }
}