import axios from 'axios'
axios.defaults.withCredentials = true 

export const fetchCategoriesApi = async () => {
    return await axios.get('http://localhost:3444/categories').then(response => {
      console.log(response.data);
      return response.data;
    })
}

export const addCategorieApi = async (categorie) => {
  return await axios.post('http://localhost:3444/categorie/add', {
    idCategorie: categorie.idCategorie,
    name: categorie.name
  }).then(response => {
    console.log(response.data);
    return response.data;
  });
}

export const editCategorieApi = async (id, newData) => {
  return await axios.patch(`http://localhost:3444/categorie/${id}`, newData).then(response => {
    console.log(response.data);
    return response.data;
  });
}

export const deleteCategorieApi = async (id) => {
  return await axios.delete(`http://localhost:3444/categorie/${id}`).then(response => {
    console.log(response.data);
    return response.data;
  });
}