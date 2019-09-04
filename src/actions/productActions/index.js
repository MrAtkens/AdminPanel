import { fetchProductsApi, deleteProductApi } from '../../API'
import {GET_PRODUCT_START, GET_PRODUCT_SUCCES, GET_PRODUCT_FAILURE,
DELETE_PRODUCT_START, DELETE_PRODUCT_SUCCES, DELETE_PRODUCT_FAILURE} from '../../actionType'

export const fetchProducts = () => async dispatch => {
    dispatch({type: GET_PRODUCT_START})

  try {
    const categories = await fetchProductsApi()
    console.log("ACTION: "+categories)
  
    dispatch({
      type: GET_PRODUCT_SUCCES,
      payload: categories
    })
  } catch (err) {
    dispatch({
      type: GET_PRODUCT_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const deleteProduct = (id) => async dispatch => {
  dispatch({type: DELETE_PRODUCT_START})

  try {
    const status = await deleteProductApi(id)
    console.log("ACTION: "+status.status)
  
    dispatch({
      type: DELETE_PRODUCT_SUCCES,
      payload: status.status
    })
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: false,
    })
}
}