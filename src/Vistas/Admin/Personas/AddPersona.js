import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Pressable, StyleSheet,ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export const AddPersona = ({ isVisible, onClose, onAgregar,cargos}) => {
  const [rol, setRol] = useState("cliente");
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [codZona, setCodZona] = useState('');
  const [codCargo, setCodCargo] = useState(-1);
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');

  const clearImputs = () => {
    setRol("cliente");
    setCedula('');
    setCorreo('');
    setNombre('');
    setCodZona('');
    setCodCargo(-1);
    setTelefono('');
    setDireccion('');
    setPassword('');
    };

  const handleAgregar = () => {
    const nuevaPersona = {
      rol,
      cedula,
      correo,
      nombre,
      password,
      cod_zona: parseInt(codZona),
      cod_cargo: parseInt(codCargo),
      telefono,
      direccion,
    };
    if(nuevaPersona.rol === "cliente") nuevaPersona.cod_cargo = undefined;
    onAgregar(nuevaPersona);
    clearImputs();
    onClose();
  };
  

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>     
      <View style={styles.modalContainer}>      
        <View style={styles.modalContent}>
          <ScrollView >
          <Text style={styles.modalTitle}>Agregar Persona</Text>
          <Text>Rol:</Text>
          <Pressable style={styles.dropdown} onPress={() => setRol(rol === "cliente" ? "colaborador" : "cliente")}>
            <Text>{rol === "colaborador" ? 'Colaborador' : 'Cliente'}</Text>
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder="Cédula"
            value={cedula}
            onChangeText={setCedula}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
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
          <Text>Código de Zona</Text>
          <TextInput           
            style={styles.input}
            keyboardType="numeric"
            value={codZona}
            onChangeText={setCodZona}
          />
          {rol === "colaborador" && (
          <View>
          <Text>Cargo</Text>
          <Picker           
                selectedValue={codCargo}
                onValueChange={setCodCargo}
                mode="dropdown"
                style={styles.picker}
              >
                <Picker.Item label="Seleccione un cargo" value={-1} />
                {cargos.map((cargo) => (
                  <Picker.Item
                    key={cargo.cod_cargo}
                    label={cargo.nombre}
                    value={cargo.cod_cargo}
                  />
                ))}</Picker>
                </View>)}
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
    picker: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 5,
      backgroundColor: 'white',
      overflow: 'hidden',
      padding: 10,
      marginBottom: 15,
    },
  });