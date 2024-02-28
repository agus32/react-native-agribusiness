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


export const PostWithoutToken = async (route,body) => {
  try {
    const response = await fetch(`${BASE_URL}/${route}`, {
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
    const errorMessage = error.toString() || 'Error desconocido';
    showAlert(errorMessage, 'Error de conexión');
    console.log(error, 'Error');
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
      const errorMessage = error.toString() || 'Error desconocido';
      showAlert(errorMessage, 'Error de conexión');
      console.log(error, 'Error');
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
      const errorMessage = error.toString() || 'Error desconocido';
      showAlert(errorMessage, 'Error de conexión');
      console.log(error, 'Error');
    }
  };


  export const handleApiFile = async (method,route,file) => {
    const formData = new FormData();
    const fileName = file.substring(file.lastIndexOf('/') + 1);
    const type = () =>{
      const p = fileName.substring(fileName.lastIndexOf('.') + 1);
      if (p === 'pdf') return 'application/pdf';
      else if (p === 'csv') return 'text/csv';
      else return 'application/octet-stream';
    }
    formData.append('file', {
      uri: file,
      name: fileName,
      type: type(),
    });
    console.log(formData);


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
      const errorMessage = error.toString() || 'Error desconocido';
      showAlert(errorMessage, 'Error de conexión');
      console.log(error, 'Error');
    }
  };

  export const handleApiImage = async (method,route,image) => {
    
    const formData = new FormData();

    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    formData.append('image', {
      uri: image,
      name: filename,
      type,
    });

    try {
      const response = await fetch(`${BASE_URL}/${route}`, {
        method: method,
        headers: {
          Authorization: globalToken,
        },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok){
        ErrorHandler(data);
      }else showAlert(data.message, 'success');
      return data;
    } catch (error) {
      const errorMessage = error.toString() || 'Error desconocido';
      showAlert(errorMessage, 'Error de conexión');
      console.log(error, 'Error');
    }
  };


  export const handleGaleriaImage = async (idProducto,image,comentario) => {
    const formData = new FormData();

    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    
    formData.append('image', {
      uri: image,
      name: filename,
      type,
    });
    formData.append('comentarios', comentario);

    try {
      const response = await fetch(`${BASE_URL}/producto/${idProducto}/imagen`, {
        method: 'POST',
        headers: {
          Authorization: globalToken,
        },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok){
        ErrorHandler(data);
      }else showAlert(data.message, 'success');
      return data;
    } catch (error) {
      const errorMessage = error.toString() || 'Error desconocido';
      showAlert(errorMessage, 'Error de conexión');
      console.log(error, 'Error');
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
      const errorMessage = error.toString() || 'Error desconocido';
      showAlert(errorMessage, 'Error de conexión');
      console.log(error, 'Error');
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
      const errorMessage = error.toString() || 'Error desconocido';
      showAlert(errorMessage, 'Error de conexión');
      console.log(error, 'Error');
    }
  };

