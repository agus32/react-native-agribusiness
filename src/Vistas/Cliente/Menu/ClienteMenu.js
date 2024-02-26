import React from 'react';
import { View, Image, Text, StyleSheet,Dimensions } from 'react-native';
import {AppBarTab} from '../../../components/AppBarTab';
import { Link } from 'react-router-native';

const windowHeight = Dimensions.get('window').height;

const Menu = () => {
  return (
    <View style={styles.container}>
      <Link to="/menu/directorio" style={styles.link}  underlayColor={1} activeOpacity={0.3}>
        <View style={styles.imageContainer}>
        <Image
          source={require('../../../media/DIRECTORIO.png')}
          style={styles.image}
        />
        <Text style={styles.text}>Directorio</Text>
        </View>
      </Link>
      <Link to="/menu/articulos" style={styles.link}  underlayColor={1} activeOpacity={0.3}>
        <View style={styles.imageContainer}>
        <Image 
          source={require('../../../media/ARTICULO-TECNICO.png')}
          style={styles.image}
        />        
        <Text style={styles.text}>Artículos Técnicos</Text>
        </View>
      </Link>
    </View>
  );
};
//  <Text style={styles.text}>Artículos Técnicos</Text>  <Text style={styles.text}>Directorio</Text>
export const ClienteMenu = () => {

    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Menu"}/>
            <Menu/>
        </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%', // Cada imagen ocupa la mitad de la pantalla
    resizeMode: 'cover',
  },
  text: {
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '10%', // Espacio desde la parte inferior en porcentaje
    color: 'white', // Color del texto
    fontSize: windowHeight*0.04, // Tamaño del texto
  },
});


