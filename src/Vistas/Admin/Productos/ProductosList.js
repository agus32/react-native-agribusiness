import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ProductoItem } from './ProductoItem';
import { AddProducto } from './AddProducto';
import { Productos } from '../../../constants/constants';
import { ImportarCSVModal } from './ImportarCSV';


export const ProductosList = () => {
  const [productos, setProductos] = useState(Productos);
  const [filteredProductos, setFilteredProductos] = useState(Productos);
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
  }, [searchText]);
  
  

  const handleDelete = (id_producto) => {
    setProductos(productos.filter((producto) => producto.id_producto !== id_producto));
    setFilteredProductos(filteredProductos.filter((producto) => producto.id_producto !== id_producto));
  };

  const handleEdit = (producto) => {
    setProductos(productos.map((p) => (p.id_producto === producto.id_producto ? producto : p)));
    setFilteredProductos(filteredProductos.map((p) => (p.id_producto === producto.id_producto ? producto : p)));
  };

  const handleAgregar = (nuevoProducto) => {
    nuevoProducto.id_producto = productos.length + 1;
    setProductos([...productos, nuevoProducto]);
    setFilteredProductos([...filteredProductos, nuevoProducto]);
  }

  const handleDownload = (file_path) => {
    console.log(file_path);
  }

  const handleImportar = (uri) => {
    console.log(uri);
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
          <ProductoItem producto={item} onDelete={handleDelete} onEdit={handleEdit} onDownload={handleDownload} />
        )}
        keyExtractor={(item) => item.id_producto}
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
      />
      <AddProducto
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEnviar={handleAgregar}
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
