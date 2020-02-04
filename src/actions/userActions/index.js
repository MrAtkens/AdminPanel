import { fetchUserApi, acceptCodeApi, singInApi, adminAcceptApi, deleteSelectedUsersApi  } from '../../API'
import {GET_USERS_START, GET_USERS_SUCCES, GET_USERS_FAILURE,
GET_ACCES_CODE_START, GET_ACCES_CODE_SUCCES, GET_ACCES_CODE_FAILURE,
ADMIN_ACCEPT_START, ADMIN_ACCEPT_SUCCES, ADMIN_ACCEPT_FAILURE, 
SING_IN_START, SING_IN_SUCCES, SING_IN_FAILURE,
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

export const getAccesCode = (email) => async dispatch => {
  dispatch({type: GET_ACCES_CODE_START})

try {
  const data = await acceptCodeApi(email)
  console.log("ACTION: "+data)

  dispatch({
    type: GET_ACCES_CODE_SUCCES,
    payload: data
  })
} catch (err) {
  dispatch({
    type: GET_ACCES_CODE_FAILURE,
    payload: err,
    error: true
  })
}
}



export const singIn = (email, code) => async dispatch => {
  dispatch({type: SING_IN_START})

try {
  const data = await singInApi(email, code)
  console.log("ACTION: "+data)

  dispatch({
    type: SING_IN_SUCCES,
    payload: data
  })
} catch (err) {
  dispatch({
    type: SING_IN_FAILURE,
    payload: err,
    error: true
  })
}
}

export const adminAccept = () => async dispatch => {
  dispatch({type: ADMIN_ACCEPT_START})

try {
  const data = await adminAcceptApi()
  console.log("ACTION: "+data)

  dispatch({
    type: ADMIN_ACCEPT_SUCCES,
    payload: data.redirectStatus
  })
} catch (err) {
  dispatch({
    type: ADMIN_ACCEPT_FAILURE,
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