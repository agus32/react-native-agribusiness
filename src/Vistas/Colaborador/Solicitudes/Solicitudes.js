import React from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { Azul} from '../../../constants/constants';
import { AppBarTab } from '../../../components/AppBarTab';

const SolicitudesMenu = () => {
  return (
    <ImageBackground
      source={require('../../../media/fondo.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>

        <Link to="/solicitudes/nueva" style={styles.link}>
          <Text style={styles.buttonText}>Nueva Solicitud</Text>
        </Link>

        <Link to="/solicitudes/lista" style={styles.link}>
          <Text style={styles.buttonText}>Estatus de Solicitud</Text>
        </Link>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  link: {
    width: 300,
    backgroundColor: Azul,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

});


export const Solicitudes = () => {
    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Solicitudes"}/>
            <SolicitudesMenu />
        </View>
    )
};