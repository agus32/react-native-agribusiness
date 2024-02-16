import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {EventosItem} from './EventosItem';
import { AddEvento } from './AddEvento';
import { getApiData, deleteApiData,postApiData,handleApiImage,putApiData} from '../../../services/ApiHandler';




export const EventosList = () => {
  const [eventos,setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (searchText.trim() === '') {
        setFilteredEventos(eventos);
    } else {
      const filtered = eventos.filter(
        (e) =>
          e.titulo.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredEventos(filtered);
    }
  }, [searchText]);
  
  const getEventos = async () => {
    const response = await getApiData('evento');
      setEventos(response);
      setFilteredEventos(response);
  };

  useEffect(() => {   
    getEventos();
  }, []);


  const handleDelete = async (id_evento) => {
    await deleteApiData('evento', id_evento);
    getEventos();
  };

  const handleEdit = async(evento,id_evento,imagen) => {
    await putApiData('evento',id_evento,evento);
    if(imagen) handleApiImage('PUT',`evento/${id_evento}/imagen`,imagen);
    getEventos();
  };

  const handleAgregar = async (nuevoEvento,imagen) => {
    const response = await postApiData('evento',nuevoEvento);
    if(imagen && response.success) handleApiImage('PUT',`evento/${response.data.id_evento}/imagen`,imagen);  
    getEventos();
  }


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por titulo..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Feather name="search" size={20} color="#757575" style={styles.searchIcon} />
      </View>
      <FlatList
        data={filteredEventos}
        renderItem={({ item }) => (
          <EventosItem evento={item} onDelete={handleDelete} onEdit={handleEdit} />
        )}
        keyExtractor={(item) => item.id_evento}
        ListHeaderComponent={         
            <View style={styles.addProductoContainer}>
              <Pressable style={styles.addProductoButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addProductoText}>Nuevo Evento</Text>
              </Pressable>
            </View>         
        }
      />
    <AddEvento
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEnviar={handleAgregar}
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