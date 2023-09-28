import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { PersonaItem } from './PersonaItem';
import {PersonaFiltro} from './PersonaFiltro';
import { Personas } from '../../../constants/constants';
import { Feather } from '@expo/vector-icons';
import { AddPersona } from './AddPersona';


export const PersonasList = () => {
  const [personas, setPersonas] = useState(Personas); 
  const [filteredPersonas, setFilteredPersonas] = useState(Personas);
  const [searchText, setSearchText] = useState('');
  const [filtro, setFiltro] = useState('Todos los Usuarios');
  const [modalVisible, setModalVisible] = useState(false);

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
        (persona) => (filtro === 'Clientes' && persona.rol === 1) || (filtro === 'Colaboradores' && persona.rol === 0)
      );
      setFilteredPersonas(filtered);
    }
  }, [filtro]);
  

  const handleDelete = (cedula) => {
    setFilteredPersonas(personas.filter((persona) => persona.cedula !== cedula));
  };

  const handleEdit = (persona) => {
    
    setFilteredPersonas(personas.map((p) => (p.cedula === persona.cedula ? persona : p)));
  };

  const handleAgregar = (nuevaPersona) => {
    setPersonas([...personas, nuevaPersona]);
    console.log(nuevaPersona);
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
          <PersonaItem persona={item} onDelete={handleDelete} onEdit={handleEdit} />
        )}
        keyExtractor={(item) => item.cedula}
      />
      <AddPersona
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAgregar={handleAgregar}
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
