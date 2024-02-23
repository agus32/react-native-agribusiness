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
    marginBottom: 80,
  },
  link: {

    flex: 1,
    marginBottom: 10, 
  },
  linkContent: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    color: Azul,
    fontSize: 22,
    fontWeight: 'bold',
    
  },
  imagen: {
    height: '80%', // Ocupa el 100% de la altura disponible
    width: '100%', // Ocupa el 100% del ancho disponible
    resizeMode: 'contain',
    marginBottom: 10,

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