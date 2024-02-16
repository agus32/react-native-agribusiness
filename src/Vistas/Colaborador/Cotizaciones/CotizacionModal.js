import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet} from 'react-native';
import { Verde } from '../../../constants/constants';
import {DownloadAndShare} from '../../../services/DownloadHandler';



export const CotizacionModal = ({ isVisible, onClose,file}) => {

  const handleShare = async () => {
    try {
      await DownloadAndShare(file);
    } catch (error) {
      console.error('Error al intentar compartir la imagen', error);
    }
  };

    return (
      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <Image source={require('../../../media/exito.png')} style={styles.image} />
            <Text style={styles.successText}>Se ha creado satisfactoriamente</Text>
            <View style={{justifyContent:'space-between',flexDirection:'row'}}>
            <TouchableOpacity style={styles.boton} onPress={() => handleShare()}>
              <Text style={styles.buttonText} >Compartir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boton, {backgroundColor:'red'}]} onPress={onClose}>
              <Text style={styles.buttonText} >Cerrar</Text>
            </TouchableOpacity>
            </View>
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
    boton:{
      backgroundColor: Verde,
      padding:10,
      borderRadius:5,
      marginBottom:10,
      marginRight:10,
    },
    contentContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      alignSelf: 'center',
  },

    image: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    successText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 10,
    },
  });