import { fetchProductsApi, addProductApi, editProductApi, deleteProductApi } from '../../API'
import {GET_PRODUCT_START, GET_PRODUCT_SUCCES, GET_PRODUCT_FAILURE,
ADD_PRODUCT_START, ADD_PRODUCT_SUCCES, ADD_PRODUCT_FAILURE,
EDIT_PRODUCT_START, EDIT_PRODUCT_SUCCES, EDIT_PRODUCT_FAILURE,
DELETE_PRODUCT_START, DELETE_PRODUCT_SUCCES, DELETE_PRODUCT_FAILURE} from '../../actionType'

export const fetchProducts = () => async dispatch => {
    dispatch({type: GET_PRODUCT_START})

  try {
    const categories = await fetchProductsApi()
  
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

export const addProduct = (newProduct) => async dispatch => {
  dispatch({type: ADD_PRODUCT_START})

try {
  const status = await addProductApi(newProduct)

  dispatch({
    type: ADD_PRODUCT_SUCCES,
    payload: status
  })
} catch (err) {
  dispatch({
    type: ADD_PRODUCT_FAILURE,
    payload: err,
    error: true
  })
}
}

export const editProduct = (id, newData) => async dispatch => {
  dispatch({type: EDIT_PRODUCT_START})

try {
  const status = await editProductApi(id, newData)

  dispatch({
    type: EDIT_PRODUCT_SUCCES,
    payload: status
  })
} catch (err) {
  dispatch({
    type: EDIT_PRODUCT_FAILURE,
    payload: err,
    error: true
  })
}
}

export const deleteProduct = (id) => async dispatch => {
  dispatch({type: DELETE_PRODUCT_START})

  try {
    const status = await deleteProductApi(id)
  
    dispatch({
      type: DELETE_PRODUCT_SUCCES,
      payload: status
    })
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: false,
    })
}
}