import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Pressable, StyleSheet,Picker } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Proveedores } from '../../../constants/constants';


export const EditProductoModal = ({ isVisible, onClose, onEnviar, producto }) => {
    const[precio, setPrecio] = useState(producto.precio) ?? "";
    const[nombre, setNombre] = useState(producto.nombre?? "");
    const[presentacion, setPresentacion] = useState(producto.presentacion?? "");
    const[descripcion, setDescripcion] = useState(producto.descripcion?? "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImagen, setSelectedImagen] = useState(producto.imagen ?? "");
    const [selectedProveedor, setSelectedProveedor] = useState(producto.proovedor?? "");

  const handleEnviar = () => {
    const nuevoProducto = {
        id_producto: producto.id_producto,
        precio,
        nombre,
        presentacion,
        descripcion,
        ficha_tecnica: selectedFile?.uri ?? producto.ficha_tecnica,
        imagen: selectedImagen,
        proveedor: selectedProveedor,   
    };
    onEnviar(nuevoProducto); 
    onClose();
  };
  const handleSelectFile = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (result.type === 'success') {
      setSelectedFile(result.uri);
    }
  };

  const handleImagen = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (result.type === 'success') {
      setSelectedImagen(result.uri);
    }
  };

  const handleProveedorChange = (itemValue) => {
    setSelectedProveedor(itemValue);
  };
  

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Producto</Text>

          <TextInput
            style={styles.input}
            placeholder="Precio"
            value={precio}
            onChangeText={setPrecio}
          />
            <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
            />
            <TextInput
            style={styles.input}
            placeholder="Presentación"
            value={presentacion}
            onChangeText={setPresentacion}
            />
            <TextInput
            style={styles.input}
            placeholder="Descripción"
            multiline={true}
            numberOfLines={4}
            value={descripcion}
            onChangeText={setDescripcion}
            />
            <View style={styles.container}>
              <Text>Selecciona un proveedor:</Text>
              <Picker           
                selectedValue={selectedProveedor}
                onValueChange={handleProveedorChange}
                style={styles.picker}
                mode="dropdown"
              >
                {Proveedores.map((proveedor) => (
                  <Picker.Item
                    key={proveedor.id}
                    label={proveedor.nombre}
                    value={proveedor.nombre}
                  />
                ))}
              </Picker>
            </View>
            <Pressable style={styles.importarButton} onPress={handleSelectFile}>
              <Text style={styles.agregarButtonText}>Seleccionar Ficha Técnica</Text>
            </Pressable>
            <Pressable style={styles.importarButton} onPress={handleImagen}>
              <Text style={styles.agregarButtonText}>Seleccionar Imagen</Text>
            </Pressable>

          <Pressable style={styles.agregarButton} onPress={handleEnviar}>
            <Text style={styles.agregarButtonText}>Aceptar</Text>
          </Pressable>
          <Pressable style={styles.cancelarButton} onPress={onClose}>
            <Text style={styles.cancelarButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    input: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    picker: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 5,
      backgroundColor: 'white',
      overflow: 'hidden',
      padding: 5,
    },
    importarButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
      },
    agregarButton: {
      backgroundColor: '#2196F3',
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
  });