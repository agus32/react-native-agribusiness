import { getApiData } from "./ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';

export const PersonService = () => {

    const [user, setUser] = useState({});
    const LoggedUser = async () => {
        const loggedUser = await AsyncStorage.getItem('loggedUser');
        if (loggedUser) {
          const parsedUser = await JSON.parse(loggedUser);
          const usr = await getApiData(`persona/${parsedUser.cedula}`);
          setUser(usr);
        }
      }
        useEffect(() => {
            LoggedUser();
        }, []);

    return user;
    };
