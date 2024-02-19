import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';
import {setGlobalToken} from './ApiHandler';

export const PersonService = () => {

    const [user, setUser] = useState({});
    
    
    useEffect(() => {
      LoggedUser();
    }, []);

    const doLogin = async (imputs) => {
      const response = await PostLogin(imputs);
      if (response.success){  
        await AsyncStorage.setItem('loggedUser', JSON.stringify({rol:response.rol,token:response.token,cedula:imputs.cedula}));
        setUser({rol:response.rol,token:response.token,cedula:imputs.cedula});
        navigate("/");
      }
    }

    const doLogout = () => {
      AsyncStorage.removeItem('loggedUser');
      setUser({});
      setGlobalToken("");
    };

    const LoggedUser = async () => {
      const loggedUser = await AsyncStorage.getItem('loggedUser');
      if (loggedUser) {
        const parsedUser = JSON.parse(loggedUser);
        setUser(parsedUser);
        console.log(parsedUser);
        setGlobalToken(parsedUser.token);
      }
    }

    return {
        getUser: () => user,
        doLogin,
        doLogout,
    };

    };
