import axios from 'axios'
axios.defaults.withCredentials = true 

export const fetchMailsApi = async () => {
    return await axios.get('http://localhost:3444/mail').then(response => {
      console.log(response.data);
      return response.data;
    })
}

export const deleteSelectedMailsApi = async (ids) => {
  return await axios.delete(`http://localhost:3444/mail`, { mails: ids }).then(response => {
    console.log(response.data);
    return response.data;
  });
}