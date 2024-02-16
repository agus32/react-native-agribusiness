import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export const ImportarCSVModal = ({ isVisible, onClose, onEnviar }) => {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleEnviar = () => {
      if (selectedFile) {
        onEnviar(selectedFile);
        onClose();
      }
      else{
        alert("No se ha seleccionado ningún archivo");
      }
    };
  

    const handleSelectFile = async () => {
      let result = await DocumentPicker.getDocumentAsync({});
      if(!result.canceled) {setSelectedFile(result.assets[0].uri);}
    };
  
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Importar Productos desde CSV</Text>
  
            <Pressable style={styles.agregarButton} onPress={handleSelectFile}>
              <Text style={styles.agregarButtonText}>Seleccionar archivo CSV</Text>
            </Pressable>            
            <Pressable style={styles.enviarButton} onPress={handleEnviar}>
              <Text style={styles.enviarButtonText}>Enviar</Text>
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
        marginTop: 10,
      },
      enviarButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
  });