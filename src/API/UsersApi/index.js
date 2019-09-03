import axios from 'axios'
axios.defaults.withCredentials = true 

export const fetchUserApi = async () => {
    return await axios.get('http://localhost:3444/users').then(response => {
      console.log(response.data);
      return response.data;
    })
}

export const deleteSelectedUsersApi = async (ids) => {
  return await axios.post(`http://localhost:3444/delete`, { users: ids }).then(response => {
    console.log(response.data);
    return response.data;
  });
}