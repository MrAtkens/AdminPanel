import axios from 'axios'
axios.defaults.withCredentials = true 

export const fetchOrdersApi = async () => {
    return await axios.get('http://localhost:3444/orders').then(response => {
      console.log(response.data);
      return response.data;
    })
}

export const acceptOrderApi = async (data) => {
    return await axios.post('http://localhost:3444/orderAccept', {orderProducts: data}).then(response => {
      console.log(response.data);
      return response.data;
    })
}

export const deleteOrderApi = async (id) => {
  return await axios.delete(`http://localhost:3444/order/${id}`).then(response => {
    console.log(response.data);
    return response.data;
  });
}