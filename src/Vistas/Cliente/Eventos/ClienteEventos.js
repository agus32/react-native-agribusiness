import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { getApiData } from '../../../services/ApiHandler';
import { AppBarTab } from '../../../components/AppBarTab';
import { Azul } from '../../../constants/constants';

 export const ArticulosList = ({articulos}) => {


  return (
    <View style={styles.container}>
      <FlatList
        data={articulos}
        renderItem={({ item }) => (
          <ArticulosItem item={item}/>
        )}
        keyExtractor={(item) => item.id_evento}
        ListFooterComponent={<View style={{ height: 80 }} />}
        ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                   <Text>No se encontraron articulos</Text>
                            </View>}
      />
    </View>
  );
};

const ArticulosItem = ({ item }) => {

    const diasPublicado = (date) => {
        const fechaPublicacion = new Date(date);
        const fechaActual = new Date();
        const diferencia = fechaActual - fechaPublicacion;
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        
        return dias;
    };

  return (
    <View style={styles.articuloItem}>  
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.diasPublicado}>hace {diasPublicado(item.fecha_creacion)} día/s | 1 min lectura</Text>
        <View style={styles.lineaSeparadora} />
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        {item.image && <Image source={{ uri: item.image }} style={styles.articuloImagen} resizeMode="cover"/>}
    </View>
  );
};

export const ClienteEventos = () => {
    const [articulos, setArticulos] = useState([]);

    const getArticulos = async () => {
      const response = await getApiData('evento');
      
      setArticulos(response);
    };
  
    useEffect(() => {
      getArticulos();
    }, []);

        return (
            <View style={{ width: '100%',flexGrow: 1 }}>
                <AppBarTab children={"Eventos"}/>
                <ArticulosList articulos={articulos}/>
            </View>
        )
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  articuloItem: {
    flex: 1,
    margin: 12,
    marginBottom: 16,
    overflow: 'hidden',

  },
  articuloImagen: {
    justifyContent: 'flex-end',
    flex: 1,
    width: '100%',
    height: 200,
  },
  lineaSeparadora: {
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    marginVertical: 8,
    marginBottom: 8,

  },
  titulo: {
    textAlign: 'left',
    color: Azul,
    fontSize: 25,

  },
  diasPublicado: {
    textAlign: 'left',
    color: 'lightgrey',
    fontSize: 12,

  },
  descripcion: {
    textAlign: 'justify',
    color: 'black',
    fontSize: 16,

  },
});
