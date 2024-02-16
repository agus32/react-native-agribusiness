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
        ListFooterComponent={<View style={{ height: 80 }}/>}

      />

    </View>
  );
};

const LineasItem = ({linea}) => {

    return (
      <View style={styles.lineaItem}>
          <ImageBackground 
            source={linea.image || require('../../../media/image-not-found.png')}
            style={styles.lineaImagen} 
            resizeMode="cover"
          />
          <Link to={'/productos/'+linea.id_linea}>
              <Text style={styles.lineaTexto}>{linea.nombre}</Text>
          </Link>
      </View>
        
    );
    //linea.image || require('../../../media/image-not-found.png'
};
  

  const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
    },
    lineaItem: {
      flex: 1,
      aspectRatio: 1, // Para que cada ítem sea cuadrado
      margin: 4,
      overflow: 'hidden'

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

