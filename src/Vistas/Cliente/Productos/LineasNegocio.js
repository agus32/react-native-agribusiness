import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,ImageBackground,Dimensions } from 'react-native';
import { getApiData} from '../../../services/ApiHandler';
import { AppBarTab } from '../../../components/AppBarTab';
import { Link } from 'react-router-native';

const windowHeight = Dimensions.get('window').height;


const LineasList = () => {
  const [lineas, setLineas] = useState([]);


  
  const getLineas = async () => {
    const response = await getApiData('linea'); 
    setLineas(response);
  };


  useEffect(() => {   
    getLineas(); 
  }, []);


  return (
    <View style={styles.container}>

      <FlatList
        data={lineas}
        numColumns={2}
        renderItem={({ item }) => (
          <LineasItem linea={item}/>
        )}
        keyExtractor={(item) => item.id_linea}

      />

    </View>
  );
};

const LineasItem = ({linea}) => {

    return (
      <Link style={styles.link} to={'/productos/'+linea.id_linea} underlayColor={1} activeOpacity={0.3}>
        <View style={styles.lineaItem}>
          <ImageBackground 
            source={linea.image ? { uri: linea.image } : require('../../../media/image-not-found.png')}
            style={styles.lineaImagen} 
            resizeMode="cover"
          />
          <Text style={styles.lineaTexto}>{linea.nombre}</Text>
        </View>
      </Link>
    );
};
  

  const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
    },
    link: {
      flex: 1,
      aspectRatio: 1, // Para que cada ítem sea cuadrado
      margin: 4,

    },
    lineaItem: {
      flex: 1,
    },
    lineaImagen: {
      flex: 1,
      justifyContent: 'center',
    },
    lineaTexto: {
      position: 'absolute',
      textAlign: 'center',
      color: 'white',
      fontSize: windowHeight * 0.03,
      alignSelf: 'center',
      bottom: 10,
      
    },

  });
  
  
export const LineasNegocio = () => {
    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Productos"}/>
            <LineasList/>
        </View>
    )
};

