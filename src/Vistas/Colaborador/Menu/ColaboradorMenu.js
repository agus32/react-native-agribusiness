import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { AppBarTab } from '../../../components/AppBarTab';

const MenuComponent = () => {
  return (
    <View style={styles.container}>
      <Link to="/menu/galeria" style={styles.link} underlayColor={1} activeOpacity={0.3}>
        <View style={styles.linkContent}>
          <Image
            source={require('../../../media/galeria.png')}
            style={styles.imagen}
          />
          <Text style={[styles.buttonText,{marginTop: 30}]}>Galería Compartida</Text>
        </View>
      </Link>

      <Link to="/menu/archivos" style={styles.link} underlayColor={1} activeOpacity={0.3}>
        <View style={styles.linkContent}>
          <Image
            source={require('../../../media/archivos-interes.png')}
            style={styles.imagen}
          />
          <Text style={styles.buttonText}>Archivos de Interés</Text>
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 30,
  },
  link: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
  },
  linkContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  imagen: {
    height: '80%', // Ocupa el 100% de la altura disponible
    width: '100%', // Ocupa el 100% del ancho disponible
    resizeMode: 'contain',
  },
});




export const ColaboradorMenu = () => {
    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Menu"}/>
            <MenuComponent/>
        </View>
    )
};