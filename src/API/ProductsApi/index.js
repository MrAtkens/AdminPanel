import axios from 'axios'
axios.defaults.withCredentials = true 

export const fetchProductsApi = async () => {
    return await axios.get('http://localhost:3444/products').then(response => {
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