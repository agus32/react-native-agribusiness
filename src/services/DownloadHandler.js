import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Linking, Alert, Platform } from 'react-native';

export const DownloadAndShare = async (url) => {
  try {
    // Crea un nombre de archivo único basado en la URL
    const nombreArchivo = url.substring(url.lastIndexOf('/') + 1);

    // Configura la ruta para guardar el archivo en el sistema de archivos de Expo
    const rutaDescarga = `${FileSystem.documentDirectory}${nombreArchivo}`;

    // Descarga el archivo utilizando Expo FileSystem
    await FileSystem.downloadAsync(url, rutaDescarga);

    // Comparte el archivo descargado
    await Sharing.shareAsync(rutaDescarga);

    return rutaDescarga; // Devuelve la ruta del archivo descargado
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
    throw error;
  }
};


export const callNumber = phone => {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  }
  else  {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
  .then(supported => {
    if (!supported) {
      Alert.alert('El numero de telefono no es valido');
    } else {
      return Linking.openURL(phoneNumber);
    }
  })
  .catch(err => console.log(err));
};