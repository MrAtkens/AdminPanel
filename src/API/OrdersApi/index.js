import axios from 'axios'
axios.defaults.withCredentials = true 

const URL = 'localhost:3444'

export const fetchOrdersApi = async () => {
    return await axios.get(`http://${URL}/orders`).then(response => {
      console.log(response.data);
      return response.data;
    })
}

export const acceptOrderApi = async (data) => {
    return await axios.post(`http://${URL}/orderAccept`, {orderProducts: data}).then(response => {
      console.log(response.data);
      return response.data;
    })
}

export const deleteOrderApi = async (id) => {
  return await axios.delete(`http://${URL}/order/${id}`).then(response => {
    console.log(response.data);
    return response.data;
  });
}