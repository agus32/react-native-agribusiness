import * as Notifications from 'expo-notifications';


const projectId ='5547cd21-e47e-48b3-889e-415ccf1dd78c';

export const getNotificationsToken = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: askAgain } = await Notifications.requestPermissionsAsync();
    if (askAgain !== 'granted') {
      return;
    }
  }

  const token = (await Notifications.getExpoPushTokenAsync({projectId})).data;
  
  return token;
};

