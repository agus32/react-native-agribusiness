import * as Notifications from 'expo-notifications';


export const getNotificationsToken = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: askAgain } = await Notifications.requestPermissionsAsync();
    if (askAgain !== 'granted') {
      return;
    }
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  return token;
};

