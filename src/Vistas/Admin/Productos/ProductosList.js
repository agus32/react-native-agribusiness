import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ProductoItem } from './ProductoItem';
import { AddProducto } from './AddProducto';
import { ImportarCSVModal } from './ImportarCSV';
import { getApiData,deleteApiData,postApiData, putApiData,handleApiFile,handleApiImage} from '../../../services/ApiHandler';


export const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImportarVisible, setModalImportarVisible] = useState(false);

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
  const getProveedores = async () => {
    const response = await getApiData('proveedor');
    setProveedores(response);
  }

  useEffect(() => {   
    getProductos();
   getProveedores();
    
  }, []);

  const handleDelete = async(id_producto) => {
    await deleteApiData('producto', id_producto);
    getProductos();
  };

  const handleEdit = async(nuevoProducto,id_producto,ficha,imagen) => {
    await putApiData('producto',id_producto,nuevoProducto);
    if(ficha) handleApiFile('PUT',`producto/${id_producto}/ficha`,ficha);
    if(imagen) handleApiImage('POST',`producto/${id_producto}/portada`,imagen);
    getProductos();
  };

  const handleAgregar = async(nuevoProducto,ficha,imagen) => {
    const response = await postApiData('producto',nuevoProducto);
    if(ficha && response.success) handleApiFile('PUT',`producto/${response.data.id_producto}/ficha`,ficha);
    if(imagen && response.success) handleApiImage('POST',`producto/${response.data.id_producto}/portada`,imagen);
    getProductos();
  }

  const handleDownload = (file_path) => {
    
  }

  const handleImportar = (csv) => {
    handleApiFile('POST',`producto/list`,csv);
  }

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
          <ProductoItem producto={item} onDelete={handleDelete} onEdit={handleEdit} onDownload={handleDownload} proveedores={proveedores}/>
        )}
        keyExtractor={(item) => item.id_producto}
        ListFooterComponent={<View style={{ height: 80 }}/>}
        ListHeaderComponent={         
            <View style={styles.addProductoContainer}>
              <Pressable style={styles.addProductoButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addProductoText}>Nuevo Producto</Text>
              </Pressable>
              <Pressable style={styles.addProductoButton} onPress={() => setModalImportarVisible(true)}>
              <Text style={styles.addProductoText}>Importar CSV</Text>
              </Pressable>
            </View>         
        }
        ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                   <Text>No se encontraron productos</Text>
                            </View>}
      />
      <AddProducto
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEnviar={handleAgregar}
        proveedores={proveedores}
      />
      <ImportarCSVModal
        isVisible={modalImportarVisible}
        onClose={() => setModalImportarVisible(false)}
        onEnviar={handleImportar}
      />

    </View>
  );
};

const styles = StyleSheet.create({
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
  addProductoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 5,
    paddingVertical: 10,
    elevation: 2,
  },
  addProductoButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  addProductoText: {
    color: '#2196F3',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
