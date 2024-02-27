import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigate} from 'react-router-native';
import { PostLogin,setGlobalToken } from '../services/ApiHandler';
import {getNotificationsToken} from '../services/NotificationsTokenHandler';

const PersonContext = createContext();

export const PersonProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});


  useEffect(() => {
    // Función para obtener el usuario almacenado al cargar la aplicación
    const fetchLoggedUser = async () => {
      const loggedUser = await AsyncStorage.getItem('loggedUser');
      if (loggedUser) {
        const parsedUser = JSON.parse(loggedUser);
        setUser(parsedUser);
        setGlobalToken(parsedUser.token);
      }
    };
    getNotificationsToken();
    fetchLoggedUser();
  }, []);

  const doLogin = async (inputs) => {
    const response = await PostLogin(inputs);
    if (response.success) {
      await AsyncStorage.setItem('loggedUser', JSON.stringify({ rol: response.rol, token: response.token, cedula: inputs.cedula }));
      setUser({ rol: response.rol, token: response.token, cedula: inputs.cedula });
      setGlobalToken(response.token);
      navigate("/");
    }
  };

  const doLogout = () => {
    AsyncStorage.removeItem('loggedUser');
    setUser({});
    setGlobalToken('');
    navigate("/");
  };

  return (
    <PersonContext.Provider value={{ user, doLogin, doLogout }}>
      {children}
    </PersonContext.Provider>
  );
};

export const usePerson = () => {
  const context = useContext(PersonContext);
  if (!context) {
    throw new Error('usePerson must be used within a PersonProvider');
  }
  return context;
};
