import axios from 'axios'
axios.defaults.withCredentials = true 

export const fetchProductsApi = async () => {
    return await axios.get('http://localhost:3444/products').then(response => {
      console.log(response.data);
      return response.data;
    })
}
export const addProductApi = async (newProduct) => {
  return await axios.post('http://localhost:3444/add', newProduct).then(response => {
    console.log(response.data);
    return response.data;
  });
}


export const editProductApi = async (id, newData) => {
  return await axios.patch(`http://localhost:3444/product/${id}`, newData).then(response => {
    console.log(response.data);
    return response.data;
  })
}

export const deleteProductApi = async (id) => {
  return await axios.delete(`http://localhost:3444/product/${id}`).then(response => {
    console.log(response.data);
    return response.data;
  });
}