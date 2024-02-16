import { NativeRouter} from 'react-router-native';
import { Navigation } from './src/navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setGlobalToken } from './src/services/ApiHandler';
import { useState,useEffect } from 'react';




export default function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);


  const handleLogout = () => {
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
    } setLoading(false);
  }


  useEffect(() => {
    LoggedUser();
  }, []);

  return(
    !loading &&
    <NativeRouter>
       <Navigation user={user} LoggedUser={LoggedUser} handleLogout={handleLogout}/>
    </NativeRouter>
  );
  
}