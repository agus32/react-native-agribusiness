import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput,Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getApiData} from '../../../services/ApiHandler';
import { Azul } from '../../../constants/constants';
import { AppBarTab } from '../../../components/AppBarTab';


export const ProductosList = ({productos}) => {
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredProductos(productos);
    } else {
      const filtered = productos.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProductos(filtered);
    }
  }, [searchText,productos]);
  

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre.."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Feather name="search" size={20} color="#757575" style={styles.searchIcon} />
      </View>
      <FlatList
        data={filteredProductos}
        renderItem={({ item }) => (
          <ProductoItem producto={item}/>
        )}
        keyExtractor={(item) => item.id_producto}
        ListFooterComponent={<View style={{ height: 80 }}/>}
        ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                   <Text>No se encontraron productos</Text>
                            </View>}

      />

    </View>
  );
};
const ProductoItem = ({ producto}) => {

    const handleDownload = () => {
        console.log(producto.ficha_tecnica);
    };

  
    return (
      <View style={styles.productoItem}>
        <View>
          <Image source={producto.portada || require('../../../media/image-not-found.png')} style={{ width: 120, height: 120,marginRight: '10px', borderRadius: 5 }} />
        </View>
        <View>
          <Text style={styles.productoNombre}>{producto.nombre}</Text>
          <Text style={styles.productoDesc} numberOfLines={1} ellipsizeMode="tail" >{producto.descripcion}</Text>
          <Text style={styles.productoDesc}><Text style={{ fontWeight: 'bold' }}>Proovedor: </Text>{producto.nombre_proveedor}</Text>
          <Text style={styles.productoDesc}><Text style={{ fontWeight: 'bold' }}>Presentacíon: </Text>{producto.presentacion}</Text>
          <Text style={styles.productoDesc}><Text style={{ fontWeight: 'bold' }}>Precio: </Text>{producto.precio}</Text>
          <Text style={styles.productoDesc}><Text style={{ fontWeight: 'bold' }}>IVA: </Text>{producto.iva}</Text>
          <Pressable onPress={handleDownload}>
            <Text style={styles.linkText}>Descargar Ficha Técnica</Text>
          </Pressable>
        </View>

      </View>
    );
  };
  
  
  
  const styles = StyleSheet.create({
  
    productoItem: {
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 15,
      marginHorizontal: 10,
      marginVertical: 5,
      borderRadius: 10,
      elevation: 2,
      borderColor: '#E0E0E0',
      borderWidth: 1,
      flexDirection: 'row',
      
    },
    productoNombre: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Azul,
    },
    productoDesc: {
      fontSize: 14,
      color: '#757575',
    },
    linkText: {
      fontSize: 14,
      color: '#757575',
      textDecorationLine: 'underline',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
      paddingHorizontal: 10,
      margin: 10,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 10,
      paddingRight: 20,
    },
    searchIcon: {
      position: 'absolute',
      right: 15,
    },

  });
  
  
export const FichasTecnicas = () => {
  const [productos, setProductos] = useState([]);

  const getProductos = async () => {
    const response = await getApiData('producto'); 
    console.log(response);
    setProductos(response);
  };
  
  useEffect(() => {
    getProductos();
  } , []);

    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Fichas Técnicas"}/>
            <ProductosList productos={productos}/>
        </View>
    )
};