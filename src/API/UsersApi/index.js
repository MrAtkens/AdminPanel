import axios from 'axios'
axios.defaults.withCredentials = true 

const URL = 'localhost:3444'

export const fetchUserApi = async () => {
  return await axios.get(`http://${URL}/users`).then(response => {
    console.log(response.data);
    return response.data;
  })
}

export const acceptCodeApi = async (userEmail) => {
  return await axios.post(`http://${URL}/acceptPhoneMail`, {
    email: userEmail}).then(response => {
    console.log(response.data)
    return response.data
  })
}

export const singInApi = async (userPhone, userCode) => {
  return await axios.post(`http://${URL}/singInAdmin`, {
    phone: userPhone,
    code: userCode
  }).then(response => {
    console.log(response.data)
    return response.data
  })
}

export const adminAcceptApi = async () => {
  return await axios.get(`http://${URL}/userAccept`).then(response => {
      return response.data
    }) 
}  

export const deleteSelectedUsersApi = async (ids) => {
  return await axios.post(`http://${URL}/delete`, { users: ids }).then(response => {
    console.log(response.data);
    return response.data;
  });
}