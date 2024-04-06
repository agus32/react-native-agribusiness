import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput,Image,Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getApiData,handleGaleriaImage} from '../../../services/ApiHandler';
import { Azul,Verde } from '../../../constants/constants';
import { AppBarTab } from '../../../components/AppBarTab';
import { Link } from 'react-router-native';
import * as ImagePicker from 'expo-image-picker';



const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modal, setModal] = useState(false);
  const [idProducto, setIdProducto] = useState(0);


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
  
  const getProductos = async () => {
    const response = await getApiData('producto'); 
    setProductos(response);
  };

  const handleCargar = (id) => {
    setIdProducto(id);
    setModal(true);
  };

  const handleEnviar = async (selectedFile,idProducto,comentario) => {
    
    await handleGaleriaImage(idProducto,selectedFile,comentario);

  }

  useEffect(() => {   
    getProductos(); 
  }, []);


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
          <ProductoItem producto={item} handleCargar={handleCargar}/>
        )}
        keyExtractor={(item) => item.id_producto}

      />
      <CargaModal isVisible={modal} onClose={() => setModal(false)} idProducto={idProducto} onEnviar={handleEnviar} />

    </View>
  );
};
const ProductoItem = ({ producto,handleCargar}) => {



  
    return (
      <View style={styles.productoItem}>
        <View>
        <Image 
            source={producto.portada ? {uri:producto.portada} : require('../../../media/image-not-found.png')} 
            style={{ width: 120, height: 120,marginRight: 10, borderRadius: 5 }} 
          />
        </View>
        <View style={{flex:1}}>
          <Text style={styles.productoNombre}>{producto.nombre}</Text>
          <Text style={styles.productoDesc} numberOfLines={1} ellipsizeMode="tail" >{producto.descripcion}</Text>
          <Text style={styles.productoDesc}><Text style={{ fontWeight: 'bold' }}>Proovedor: </Text>{producto.nombre_proveedor}</Text>
          <Text style={styles.productoDesc}><Text style={{ fontWeight: 'bold' }}>Presentacíon: </Text>{producto.presentacion}</Text>
          <Text style={styles.productoDesc}><Text style={{ fontWeight: 'bold' }}>Precio: </Text>{producto.precio}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.loadButton]} onPress={() => handleCargar(producto.id_producto)}>
                <Text style={styles.buttonText}>Cargar</Text>
            </TouchableOpacity>

            <Link to={'/menu/galeria/'+producto.id_producto} style={[styles.button, styles.viewButton]} underlayColor={1} activeOpacity={0.3}>
                <Text style={styles.buttonText}>Ver</Text>
            </Link>
          </View>
        </View>
      
      </View>
    );
  };
  

  export const CargaModal = ({ isVisible, onClose, idProducto,onEnviar }) => {
    const [selectedImagen, setSelectedImagen] = useState([]);
    const [comentario, setComentario] = useState("");
  
    const handleEnviar = () => {
      if (selectedImagen) {
        onEnviar(selectedImagen,idProducto,comentario);
        onClose();
      }
    };
  
    const pickImage = async () => {
   
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 1,
      });
      if (!result.canceled) {
        
          setSelectedImagen(result.assets[0]?.uri);
      }
    };

  
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cargar Imagen</Text>
  
            <TouchableOpacity style={styles.agregarButton} onPress={pickImage}>
              <Text style={styles.agregarButtonText}>Seleccionar Imagen</Text>
            </TouchableOpacity>  
            <TextInput
              placeholder='Comentario (opcional)'
              style={styles.input}
              onChangeText={setComentario}
              value={comentario}
            />          
            <TouchableOpacity style={styles.enviarButton} onPress={handleEnviar}>
              <Text style={styles.enviarButtonText}>Enviar</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.cancelarButton} onPress={onClose}>
              <Text style={styles.cancelarButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  
  
  const styles = StyleSheet.create({
    
    input: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      marginBottom: 5,
    },
  
    productoItem: {
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 15,
      marginHorizontal: 10,
      marginVertical: 5,
      borderRadius: 10,
      elevation: 2,
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
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        flex: 1,
        padding: 5,
        borderRadius: 10,
        margin: 10,

        alignItems: 'center',
      },
      loadButton: {
        backgroundColor: Azul,
      },
      viewButton: {
        backgroundColor: Verde,
      },
      buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      agregarButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
      },
      agregarButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      cancelarButton: {
        backgroundColor: '#FF0000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 5,
      },
      cancelarButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      enviarButton: {
          backgroundColor: '#2196F3',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginTop: 5,
        },
        enviarButtonText: {
          color: 'white',
          fontWeight: 'bold',
        },

  });
  
  
export const GaleriaCompartida = () => {
    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Galeria Compartida"}/>
            <ProductosList/>
        </View>
    )
};