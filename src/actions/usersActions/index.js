import { fetchUserApi, deleteSelectedUsersApi  } from '../../API'
import {GET_USERS_START, GET_USERS_SUCCES, GET_USERS_FAILURE, 
DELETE_USERS_START, DELETE_USERS_SUCCES, DELETE_USERS_FAILURE} from '../../actionType'

export const fetchUsers = () => async dispatch => {
    dispatch({type: GET_USERS_START})

  try {
    const users = await fetchUserApi()
    console.log("ACTION: "+users)
  
    dispatch({
      type: GET_USERS_SUCCES,
      payload: users
    })
  } catch (err) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const deleteSelectedUsers = (ids) => async dispatch => {
    dispatch({type: DELETE_USERS_START})

  try{
    console.log(ids)
    const status = await deleteSelectedUsersApi(ids)
    console.log("ACTION: "+status)
  
    dispatch({
      type: DELETE_USERS_SUCCES,
      payload: status
    })
  } catch (err) {
    dispatch({
      type: DELETE_USERS_FAILURE,
      payload: err,
      error: true
    })
  }
}