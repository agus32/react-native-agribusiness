import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Pressable, StyleSheet,ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';


export const EditProductoModal = ({ isVisible, onClose, onEnviar, producto ,proveedores}) => {
    const[precio, setPrecio] = useState(producto.precio) ?? "";
    const[nombre, setNombre] = useState(producto.nombre?? "");
    const[iva, setIva] = useState(producto.iva?? "");
    const[presentacion, setPresentacion] = useState(producto.presentacion?? "");
    const[descripcion, setDescripcion] = useState(producto.descripcion?? "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImagen, setSelectedImagen] = useState(null);
    const[idProveedor, setIdProveedor] = useState(producto.id_proveedor ?? -1);


  const handleEnviar = () => {
    const nuevoProducto = {
        precio: parseFloat(precio),
        nombre,
        iva: parseFloat(iva),
        presentacion,
        descripcion,
        id_proveedor: parseInt(idProveedor),   
    };
    onEnviar(nuevoProducto,producto.id_producto,selectedFile,selectedImagen); 
    onClose();
  };
  const handleSelectFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if(!result.canceled) setSelectedFile(result.assets[0].uri); 
  };

  const handleImagen = async () => {
   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
        setSelectedImagen(result.assets[0].uri);
    }
  };


  

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>      
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
          <Text style={styles.modalTitle}>Editar Producto</Text>
            
            <Text>Nombre:</Text>
            <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            />
            <Text>Presentación:</Text>
            <TextInput
            style={styles.input}
            value={presentacion}
            onChangeText={setPresentacion}
            />
            <Text>Precio:</Text>
            <TextInput
              style={styles.input}
              value={precio}
              onChangeText={setPrecio}
            />
            <Text>IVA:</Text>
            <Picker
              selectedValue={iva}
              onValueChange={setIva}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="0%" value="0" />
              <Picker.Item label="10.5%" value="10.5" />
              <Picker.Item label="21%" value="21" />
            </Picker>
            <Text>Descripción:</Text>
            <TextInput
            style={styles.input}
            multiline={true}
            numberOfLines={4}
            value={descripcion}
            onChangeText={setDescripcion}
            />
            <View>
            <Text>Selecciona un proveedor:</Text>
              <Picker           
                selectedValue={idProveedor}
                onValueChange={setIdProveedor}
                style={styles.picker}
                mode="dropdown"
              >
                {proveedores.map((proveedor) => (
                  <Picker.Item
                    key={proveedor.id_proveedor}
                    label={proveedor.nombre}
                    value={proveedor.id_proveedor}
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
         </ScrollView> 
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
      padding: 10,
      marginBottom: 15,
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