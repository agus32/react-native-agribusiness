import React from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { Link } from 'react-router-native';
import { Verde,Azul } from '../../constants/constants';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../media/slogan-1-1024x416.png')}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Bienvenido</Text>
      <Text style={styles.smallText}>Para comenzar, seleccione una opción:</Text>
      <View style={styles.buttonContainer}>
        
        <Pressable style={styles.button}>
        <Link to="/login" style={styles.link}>
          <Text style={styles.buttonText}>Colaborador</Text>
          </Link>
        </Pressable>
        
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Cliente</Text>
        </Pressable>
        <Text style={styles.underlineText}>Modo Invitado</Text>
      </View>
      <View style={styles.bottomImageContainer}>
        <Image
          source={require('../../media/agrobusiness_ecuador.png')}
          style={styles.bottomImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Añade centrado vertical
    paddingTop: 30,
    paddingBottom: 30, // Margen de abajo a arriba
    backgroundColor: 'white',
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    tintColor: Azul,
  },
  welcomeText: {
    fontSize: 30,
    marginTop: 20,
    color: Azul,
    fontFamily: 'sans-serif',
  },
  smallText: {
    fontSize: 14,
    marginTop: 30,
  },
  underlineText: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20, // Espacio a los lados de los botones
    marginTop: 50,
  },
  button: {
    backgroundColor: Verde,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    width: 200, // Ancho del botón al 100% del contenedor
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomImageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  bottomImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

