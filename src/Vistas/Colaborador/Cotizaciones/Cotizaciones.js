import React from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { Azul} from '../../../constants/constants';
import { AppBarTab } from '../../../components/AppBarTab';

const CotizacionesMenu = () => {
  return (
    <ImageBackground
      source={require('../../../media/fondo.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>

        <Link to="/" style={styles.link}>
          <Text style={styles.buttonText}>Nueva Cotizacion</Text>
        </Link>

        <Link to="/" style={styles.link}>
          <Text style={styles.buttonText}>Cotizaciones Anteriores</Text>
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


export const Cotizaciones = () => {
    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Cotizaciones"}/>
            <CotizacionesMenu />
        </View>
    )
};