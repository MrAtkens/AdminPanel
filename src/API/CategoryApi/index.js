import axios from 'axios'
axios.defaults.withCredentials = true 

const URL = 'localhost:3444'

export const fetchCategoriesApi = async () => {
    return await axios.get(`http://${URL}/categories`).then(response => {
      console.log(response.data);
      return response.data;
    })
}

export const addCategorieApi = async (categorie) => {
  return await axios.post(`http://${URL}/categorie/add`, {
    idCategorie: categorie.idCategorie,
    name: categorie.name
  }).then(response => {
    console.log(response.data);
    return response.data;
  });
}

export const editCategorieApi = async (id, newData) => {
  return await axios.patch(`http://${URL}/categorie/${id}`, newData).then(response => {
    console.log(response.data);
    return response.data;
  });
}

export const deleteCategorieApi = async (id) => {
  return await axios.delete(`http://${URL}/categorie/${id}`).then(response => {
    console.log(response.data);
    return response.data;
  });
}