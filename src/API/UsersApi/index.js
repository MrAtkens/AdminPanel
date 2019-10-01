import axios from 'axios'
axios.defaults.withCredentials = true 

const URL = 'localhost:3444'

export const fetchUserApi = async () => {
    return await axios.get(`http://${URL}/users`).then(response => {
      console.log(response.data);
      return response.data;
    })
}

export const deleteSelectedUsersApi = async (ids) => {
  return await axios.post(`http://${URL}/delete`, { users: ids }).then(response => {
    console.log(response.data);
    return response.data;
  });
}