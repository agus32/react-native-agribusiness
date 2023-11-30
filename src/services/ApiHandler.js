import {Alert} from 'react-native';

const showAlert = (message, title) => {
  Alert.alert(
    title,
    message
  );
};


let globalToken = '';

export const setGlobalToken = (token) => {
  globalToken = token;
  console.log(globalToken);
  console.log(token);
};

const BASE_URL = 'http://epublit.com.ar:420'; // Ruta base

const ErrorHandler = (data) => { 
  if (data.errors && data.errors.length > 0) {
    const errorMessages = data.errors.map(error => error.message).join('\n');
    showAlert(errorMessages, 'Error');
  }else showAlert("Error Inesperado", 'Error');
}


export const PostLogin = async (body) => {
  try {
    const response = await fetch(`${BASE_URL}/persona/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok)ErrorHandler(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export const getApiData = async (route) => {
    try {
      const response = await fetch(`${BASE_URL}/${route}`, {
        headers: {
          Authorization: globalToken,
        },
      });
      const data = await response.json();
      if(!response.ok){
        ErrorHandler(data);
        return [];
      }
      return data.data;
    } catch (error) {
      throw error;
    }
  };
  
export const postApiData = async (route,body) => {
    try {
      const response = await fetch(`${BASE_URL}/${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: globalToken,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok){
        ErrorHandler(data);
      }else showAlert(data.message, 'Exito');
      return data;
    } catch (error) {
      throw error;
    }
  };


  export const handleApiFile = async (method,route,file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`${BASE_URL}/${route}`, {
        method: method,
        headers: {
          Authorization: globalToken,
        },
        body: formData,
      });
      const data = await response.json();
      console.log(formData);
      if (!response.ok){
        ErrorHandler(data);
      }else showAlert(data.message, 'Exito');
      return data;
    } catch (error) {
      throw error;
    }
  };


  
export const putApiData = async (route, id, body) => {
    try {
      const response = await fetch(`${BASE_URL}/${route}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: globalToken,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok){
        ErrorHandler(data);
      }else showAlert(data.message, 'Exito');
      return data;
    } catch (error) {
      
      throw error;
    }
  };
  
export const deleteApiData = async (route, id) => {
    try {
      const response = await fetch(`${BASE_URL}/${route}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: globalToken,
        },
      });
      const data = await response.json();
      if (!response.ok){
        ErrorHandler(data);
      }else showAlert(data.message, 'Exito');
      return data;
    } catch (error) {
      throw error;
    }
  };