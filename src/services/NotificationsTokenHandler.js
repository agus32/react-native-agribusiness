import * as Notifications from 'expo-notifications';
<<<<<<< HEAD
import {Alert} from 'react-native';

const projectId ='5547cd21-e47e-48b3-889e-415ccf1dd78c';
=======
//import Constants from 'expo-constants';

const projectId = "5547cd21-e47e-48b3-889e-415ccf1dd78c"
>>>>>>> 38dc387a2980e1a9099e45a7278e3622bf2aadeb

export const getNotificationsToken = async () => {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    
    if (status !== 'granted') {
      const { status: askAgain } = await Notifications.requestPermissionsAsync();
      
      if (askAgain !== 'granted') {
        return;
      }
    }

    const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    
    return token;
  } catch (error) {
    console.error('Error en getNotificationsToken:', error);
    Alert.alert(
      'Error',
      error.toString(),
      );
    return;
  }
<<<<<<< HEAD
};
=======

  const token = await Notifications.getExpoPushTokenAsync({
      projectId: projectId//Constants.expoConfig.extra.eas.projectId
  });
  
  return token.data;
};
>>>>>>> 38dc387a2980e1a9099e45a7278e3622bf2aadeb
