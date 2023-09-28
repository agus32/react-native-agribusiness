import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Pressable, StyleSheet } from 'react-native';


export const AddPersona = ({ isVisible, onClose, onAgregar }) => {
  const [rol, setRol] = useState(0);
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [codZona, setCodZona] = useState(0);
  const [idDepto, setIdDepto] = useState(0);
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const clearImputs = () => {
    setRol(0);
    setCedula('');
    setCorreo('');
    setNombre('');
    setCodZona(0);
    setIdDepto(0);
    setTelefono('');
    setDireccion('');
    };

  const handleAgregar = () => {
    const nuevaPersona = {
      rol,
      cedula,
      correo,
      nombre,
      cod_zona: codZona,
      id_depto: idDepto,
      telefono,
      direccion,
    };
    onAgregar(nuevaPersona);
    clearImputs();
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Agregar Persona</Text>
          <Text>Rol:</Text>
          <Pressable style={styles.dropdown} onPress={() => setRol(rol === 0 ? 1 : 0)}>
            <Text>{rol === 0 ? 'Colaborador' : 'Cliente'}</Text>
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder="Cédula"
            value={cedula}
            onChangeText={setCedula}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={correo}
            onChangeText={setCorreo}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Código Zona"
            keyboardType="numeric"
            value={codZona.toString()}
            onChangeText={(text) => setCodZona(parseInt(text))}
          />
          <TextInput
            style={styles.input}
            placeholder="ID Depto"
            keyboardType="numeric"
            value={idDepto.toString()}
            onChangeText={(text) => setIdDepto(parseInt(text))}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={direccion}
            onChangeText={setDireccion}
          />
          <Pressable style={styles.agregarButton} onPress={handleAgregar}>
            <Text style={styles.agregarButtonText}>Agregar</Text>
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
    dropdown: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 5,
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