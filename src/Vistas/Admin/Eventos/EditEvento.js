import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Pressable, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';




export const EditEventoModal = ({ isVisible, onClose, onEnviar, evento,type }) => {
    const[titulo, setTitulo] = useState(evento.titulo) ?? "";
    const[descripcion, setDescripcion] = useState(evento.descripcion?? "");
    const [url, setUrl] = useState(evento.url?? "");
    const[selectedImagen, setSelectedImagen] = useState(null);

  const handleEnviar = () => {
    if(type === "Evento"){
      onEnviar({titulo,descripcion},evento.id_evento,selectedImagen);
    }else{
      onEnviar({titulo,descripcion,url},evento.id,selectedImagen);
    };
    onClose();
    
  };

  const pickImage = async () => {
   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
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
          <Text style={styles.modalTitle}>Editar {type}</Text>
          <Text>Titulo:</Text>
            <TextInput
            style={styles.input}
            placeholder="Titulo"
            value={titulo}
            onChangeText={setTitulo}
            />
            <Text>Descripción:</Text>
            <TextInput
            style={styles.input}
            placeholder="Descripción"
            multiline={true}
            numberOfLines={4}
            value={descripcion}
            onChangeText={setDescripcion}
            />
            {type !== "Evento" &&
            <TextInput
            style={styles.input}
            placeholder="URL"
            value={url}
            onChangeText={setUrl}
            />
            } 
            <Pressable style={styles.importarButton} onPress={pickImage}>
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