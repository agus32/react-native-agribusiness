import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { Azul } from '../../../constants/constants';
import { AppBarTab } from '../../../components/AppBarTab';

const ArchivosInteresComponent = () => {
  return (
    <View style={styles.container}>
      <Link to="/solicitudes/lista" style={styles.link}>
        <View style={styles.linkContent}>
          <Image
            source={require('../../../media/precio.png')}
            style={styles.imagen}
          />
          <Text style={styles.buttonText}>Descarga Lista de Precios</Text>
        </View>
      </Link>

      <Link to="/solicitudes/lista" style={styles.link}>
        <View style={styles.linkContent}>
          <Image
            source={require('../../../media/proyecciones-ventas.png')}
            style={styles.imagen}
          />
          <Text style={styles.buttonText}>Descargar Proyecciones de Ventas</Text>
        </View>
      </Link>
      <Link to="/menu/archivos/fichas" style={[styles.link,{marginTop:10}]}>
        <View style={styles.linkContent}>
          <Image
            source={require('../../../media/ficha-tecnica.png')}
            style={styles.imagen}
          />
          <Text style={styles.buttonText}>Ver Fichas Técnicas</Text>
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
    paddingBottom: 70,
  },
  link: {

    width: '100%',
  },
  linkContent: {

    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: Azul,
    fontSize: 22,
    fontWeight: 'bold',
    
  },
  imagen: {
    width: 200,
    height: 200,
    resizeMode: 'contain',

  },
});




export const ArchivosInteres = () => {
    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Menu"}/>
            <ArchivosInteresComponent/>
        </View>
    )
};