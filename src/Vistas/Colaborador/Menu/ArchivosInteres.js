import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { Azul } from '../../../constants/constants';
import { AppBarTab } from '../../../components/AppBarTab';
import { getApiData } from '../../../services/ApiHandler';
import { downloadFile } from '../../../services/DownloadHandler';

const ArchivosInteresComponent = () => {
  const handlePreciosDownload = async () => {
    const path = await getApiData('lista_precios');
    if(path.url) await downloadFile(path.url);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.link} underlayColor={1} activeOpacity={0.3} onPress={handlePreciosDownload}>
        <View style={styles.linkContent}>
          <Image
            source={require('../../../media/precio.png')}
            style={styles.imagen}
          />
          <Text style={styles.buttonText}>Descarga Lista de Precios</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} underlayColor={1} activeOpacity={0.3}>
        <View style={styles.linkContent}>
          <Image
            source={require('../../../media/proyecciones-ventas.png')}
            style={styles.imagen}
          />
          <Text style={styles.buttonText}>Descargar Proyecciones de Ventas</Text>
        </View>
      </TouchableOpacity>
      <Link to="/menu/archivos/fichas" style={[styles.link,{marginTop:10}]} underlayColor={1} activeOpacity={0.3}>
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