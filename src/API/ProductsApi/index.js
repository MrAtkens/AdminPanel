import axios from 'axios'
axios.defaults.withCredentials = true 

const URL = 'localhost:3444'

export const fetchProductsApi = async () => {
    return await axios.get(`http://${URL}/products`).then(response => {
      return response.data;
    })
}

export const fetchProductByIdApi = async (id) => {
  return await axios.get(`http://${URL}/product/${id}`).then(response => {
      return response.data;
  })
}

export const addProductApi = async (newProduct) => {
  return await axios.post(`http://${URL}/add`, newProduct).then(response => {
    return response.data;
  });
}


export const editProductApi = async (id, newData) => {
  return await axios.patch(`http://${URL}/product/${id}`, newData).then(response => {
    return response.data;
  })
}

export const deleteProductApi = async (id) => {
  return await axios.delete(`http://${URL}/product/${id}`).then(response => {
    return response.data;
  });
}