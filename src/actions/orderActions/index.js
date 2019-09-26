import { fetchOrdersApi, deleteOrderApi, acceptOrderApi  } from '../../API'
import {GET_ORDERS_START, GET_ORDERS_SUCCES, GET_ORDERS_FAILURE,
 ACCEPT_ORDERS_START, ACCEPT_ORDERS_SUCCES, ACCEPT_ORDERS_FAILURE,
 DELETE_ORDERS_START, DELETE_ORDERS_SUCCES, DELETE_ORDERS_FAILURE} from '../../actionType'

export const fetchOrders = () => async dispatch => {
    dispatch({type: GET_ORDERS_START})

  try {
    const orders = await fetchOrdersApi()
  
    dispatch({
      type: GET_ORDERS_SUCCES,
      payload: orders
    })
  } catch (err) {
    dispatch({
      type: GET_ORDERS_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const acceptOrder = (orderProducts) => async dispatch => {
    dispatch({type: ACCEPT_ORDERS_START})

  try{
    console.log(orderProducts)
    const status = await acceptOrderApi(orderProducts)
  
    dispatch({
      type: ACCEPT_ORDERS_SUCCES,
      payload: status
    })
  } catch (err) {
    dispatch({
      type: ACCEPT_ORDERS_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const deleteOrder = (id) => async dispatch => {
    dispatch({type: DELETE_ORDERS_START})

  try{
    console.log(id)
    const status = await deleteOrderApi(id)
  
    dispatch({
      type: DELETE_ORDERS_SUCCES,
      payload: status
    })
  } catch (err) {
    dispatch({
      type: DELETE_ORDERS_FAILURE,
      payload: err,
      error: true
    })
  }
}