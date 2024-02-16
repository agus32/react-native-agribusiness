import React from 'react';
import { View, Image, Text, StyleSheet,Dimensions } from 'react-native';
import {AppBarTab} from '../../../components/AppBarTab';
import { Link } from 'react-router-native';

const windowHeight = Dimensions.get('window').height;

const Menu = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../media/DIRECTORIO.png')}
          style={styles.image}
        />
        <Link to="/menu/directorio" style={styles.link} >
        <Text style={styles.text}>Directorio</Text>
        </Link>
      </View>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../media/ARTICULO-TECNICO.png')}
          style={styles.image}
        />
        <Link to="/menu/articulos" style={styles.link} >
        <Text style={styles.text}>Artículos Técnicos</Text>
        </Link>
      </View>
    </View>
  );
};

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
    marginBottom: 60,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: '10%',
  },
  image: {
    width: '100%',
    height: '100%', // Cada imagen ocupa la mitad de la pantalla
    resizeMode: 'cover',
  },
  text: {
    position: 'absolute',
    bottom: '10%', // Espacio desde la parte inferior en porcentaje
    color: 'white', // Color del texto
    fontSize: windowHeight*0.04, // Tamaño del texto
  },
});


