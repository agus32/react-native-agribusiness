import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Pressable, StyleSheet,ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';

export const AddProducto = ({ isVisible, onClose, onEnviar,proveedores}) => {
  
  const[nombre, setNombre] = useState("");
  const[presentacion, setPresentacion] = useState("");
  const[precio, setPrecio] = useState("");
  const[iva, setIva] = useState("0");
  const[descripcion, setDescripcion] = useState("");
  const[idProveedor, setIdProveedor] = useState(proveedores[0]?.id_proveedor ?? "1");
  const[selectedFile, setSelectedFile] = useState(null);
  const[selectedImagen, setSelectedImagen] = useState(null);

  const handleEnviar = () => {
    const nuevoProducto = {
        precio: parseFloat(precio),
        iva: parseFloat(iva),
        nombre,
        presentacion,
        descripcion,
        id_proveedor: parseInt(idProveedor),
    };
    console.log(selectedFile);
    onEnviar(nuevoProducto,selectedFile,selectedImagen);   
    onClose();
  };


  const handleSelectFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if(!result.canceled) {setSelectedFile(result.assets[0].uri); console.log(result.assets[0].uri);}
    console.log(selectedFile);
  };

  const pickImage = async () => {
   
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
          <Text style={styles.modalTitle}>Agregar Producto</Text>
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
            placeholder="Precio"
            value={precio}
            onChangeText={setPrecio}
            />
            <Text>Seleccionar IVA:</Text>
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
            <TextInput
            style={styles.input}
            placeholder="Descripción"
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
            <Pressable style={styles.importarButton} onPress={pickImage}>
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
    picker: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 5,
      backgroundColor: 'white',
      overflow: 'hidden',
      padding: 10,
      marginBottom: 15,
    },
    input: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 5,
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