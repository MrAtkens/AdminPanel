import axios from 'axios'
axios.defaults.withCredentials = true 

const URL = 'localhost:3444'

export const fetchNewsApi = async () => {
    return await axios.get(`http://${URL}/news`).then(response => {
      console.log(response.data);
      return response.data;
    })
}

export const addNewsApi = async (newNews) => {
  return await axios.post(`http://${URL}/news/add`, {
    priority: newNews.priority,
    creationDate: newNews.date,
    titleImage: newNews.titleImage,
    alt: newNews.alt,
    name: newNews.name,
    title: newNews.titleImage,
    description: newNews.description,
  }).then(response => {
    console.log(response.data);
    return response.data;
  });
}

export const editNewsApi = async (id, newData) => {
  return await axios.patch(`http://${URL}/news/${id}`, newData).then(response => {
    console.log(response.data);
    return response.data;
  });
}

export const deleteNewsApi = async (id) => {
  return await axios.delete(`http://${URL}/news/${id}`).then(response => {
    console.log(response.data);
    return response.data;
  });
}