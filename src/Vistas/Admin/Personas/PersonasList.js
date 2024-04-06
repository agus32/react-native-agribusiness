import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { PersonaItem } from './PersonaItem';
import {PersonaFiltro} from './PersonaFiltro';
import { deleteApiData, getApiData, postApiData, putApiData } from '../../../services/ApiHandler';
import { Feather } from '@expo/vector-icons';
import { AddPersona } from './AddPersona';



export const PersonasList = () => {
  const [personas, setPersonas] = useState([]); 
  const [filteredPersonas, setFilteredPersonas] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filtro, setFiltro] = useState('Todos los Usuarios');
  const [modalVisible, setModalVisible] = useState(false);
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredPersonas(personas);
    } else {
      const filtered = personas.filter(
        (persona) =>
          persona.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
          persona.correo.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPersonas(filtered);
    }
  }, [searchText,personas]);
  
  useEffect(() => {
    if (filtro === 'Todos los Usuarios') {
      setFilteredPersonas(personas);
    } else {
      const filtered = personas.filter(
        (persona) => (filtro === 'Clientes' && persona.rol === "cliente") || (filtro === 'Colaboradores' && persona.rol === "colaborador")
      );
      setFilteredPersonas(filtered);
    }
  }, [filtro]);
  
  const getPersonas = async () => {
    const response = await getApiData('persona');
    
    setPersonas(response);
  };
  const getCargos = async () => {
    const response = await getApiData('cargo');
    setCargos(response);
  }

  useEffect(() => {   
    getPersonas();
    getCargos();
  }, []);

  const handleDelete = async (cedula) => {
    await deleteApiData('persona', cedula);
    getPersonas();
  };

  const handleEdit = async(persona,cedula) => {   
    await putApiData('persona',cedula,persona);
    getPersonas();
  };

  const handleAgregar = async (nuevaPersona) => {
    await postApiData('persona', nuevaPersona);
    getPersonas();
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o correo..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Feather name="search" size={20} color="#757575" style={styles.searchIcon} />
      </View>
      <PersonaFiltro filtro={filtro} setFiltro={setFiltro} />
      <Pressable onPress={() => setModalVisible(true)}>
            <View style={styles.addPersonContainer}>
              <Text style={styles.addPersonText}>+</Text>
            </View>
          </Pressable>
      <FlatList      
        data={filteredPersonas}
        renderItem={({ item }) => (
          <PersonaItem persona={item} onDelete={handleDelete} onEdit={handleEdit} cargos={cargos} />
        )}
        keyExtractor={(item) => item.cedula}
        ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                   <Text>No se encontraron Usuarios</Text>
                            </View>}
      />
      <AddPersona
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAgregar={handleAgregar}
        cargos={cargos}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: '100%',
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
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
  addPersonContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 2,
  },
  addPersonText: {
    color: '#2196F3',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
