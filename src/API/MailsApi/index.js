import axios from 'axios'
axios.defaults.withCredentials = true

const URL = 'localhost:3444'

export const fetchMailsApi = async () => {
    return await axios.get(`http://${URL}/mail`).then(response => {
      console.log(response.data);
      return response.data;
    })
}

export const deleteSelectedMailsApi = async (ids) => {
  return await axios.delete(`http://${URL}/mail`, { mails: ids }).then(response => {
    console.log(response.data);
    return response.data;
  });
}