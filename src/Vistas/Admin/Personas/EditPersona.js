import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Pressable, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';


export const EditPersonaModal = ({ isVisible, onClose, onEnviar, persona,cargos }) => {
  const [rol, setRol] = useState(persona.rol);
  const [correo, setCorreo] = useState(persona.correo ?? '');
  const [nombre, setNombre] = useState(persona.nombre ?? '');
  const [codZona, setCodZona] = useState(persona.cod_zona);
  const [codCargo, setCodCargo] = useState(persona.cod_cargo ?? -1);
  const [telefono, setTelefono] = useState(persona.telefono ?? '');
  const [direccion, setDireccion] = useState(persona.direccion ?? '');
  const [password, setPassword] = useState('');

  const handleEnviar = () => {
    const nuevaPersona = {
      rol,
      password,
      correo,
      nombre,
      cod_zona: codZona,
      cod_cargo: parseInt(codCargo),
      telefono,
      direccion,
    };
    if(nuevaPersona.rol === "cliente") nuevaPersona.cod_cargo = undefined;
    nuevaPersona.password = password === '' ? undefined : password;
    onEnviar(nuevaPersona,persona.cedula); 
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Usuario</Text>
          <Text>Rol:</Text>
          <Pressable style={styles.dropdown} onPress={() => setRol(rol === "cliente" ? "colaborador" : "cliente")}>
            <Text>{rol === "colaborador" ? 'Colaborador' : 'Cliente'}</Text>
          </Pressable>
          <Text>Cambio de contraseña:</Text>
          <TextInput
            style={styles.input}
            placeholder="Cambio de contraseña"
            value={password}
            onChangeText={setPassword}
          />
          <Text>Correo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={correo}
            onChangeText={setCorreo}
          />
          <Text>Nombre:</Text>
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
            value={codZona.toString()}
            onChangeText={(text) => setCodZona(parseInt(text))}
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
          <Text>Telefono:</Text>
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
          />
          <Text>Dirección:</Text>
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={direccion}
            onChangeText={setDireccion}
          />
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