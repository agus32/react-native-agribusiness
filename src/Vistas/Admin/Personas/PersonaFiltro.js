import React, { useState } from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';


export const PersonaFiltro = ({ filtro, setFiltro }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleFiltroSelect = (selectedFiltro) => {
      setFiltro(selectedFiltro);
      setModalVisible(false);
    };
  
    return (
      <View style={styles.filterContainer}>
        <Pressable
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>{filtro}</Text>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Pressable
                style={styles.modalItem}
                onPress={() => handleFiltroSelect('Todos los Usuarios')}
              >
                <Text>Todos los Usuarios</Text>
              </Pressable>
              <Pressable
                style={styles.modalItem}
                onPress={() => handleFiltroSelect('Clientes')}
              >
                <Text>Clientes</Text>
              </Pressable>
              <Pressable
                style={styles.modalItem}
                onPress={() => handleFiltroSelect('Colaboradores')}
              >
                <Text>Colaboradores</Text>
              </Pressable>
              
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
  
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    filterButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      backgroundColor: 'white',
    },
    filterButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    modalItem: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
  });
  