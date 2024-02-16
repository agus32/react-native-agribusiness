import React, { useState, useEffect } from 'react';
import { AppBarTab } from '../../../components/AppBarTab';
import { Azul} from '../../../constants/constants';
import { postApiData,getApiData} from '../../../services/ApiHandler';
import { View, TextInput, TouchableOpacity, StyleSheet,Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NuevaSolicitudForm = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [solicitado, SetSolicitado] = useState('');
  const [descripcion, setDescripcion] = useState('');

  
  const getColaboradores = async () => {
    const loggedUser = await AsyncStorage.getItem('loggedUser');
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      const data = await getApiData(`persona/${parsedUser.cedula}/solicitables`);
      setColaboradores(data);
  }}

  
useEffect(() => { getColaboradores();}, []);

  const handleEnviar = async() => {
    await postApiData('solicitud',{ solicitado, descripcion });
    SetSolicitado('');
    setDescripcion('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Destinatario:</Text>
        <Picker
          solicitado={solicitado}
          style={styles.picker}
          onValueChange={(itemValue) => SetSolicitado(itemValue)}
        >
          <Picker.Item label="Seleccione un colaborador" value="" />
          {colaboradores.map((item) => (
            <Picker.Item key={item.cedula} label={item.nombre} value={item.cedula} />
          ))}
        </Picker>
      <Text style={styles.texto}>Solicitud:</Text>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Ingrese su descripcion aquí..."
        value={descripcion}
        onChangeText={(text) => setDescripcion(text)}
      />
      <TouchableOpacity style={styles.enviarButton} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar Solicitud</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alinea al comienzo del contenedor
    alignItems: 'center',
    padding: 20,
  },
  texto: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginVertical: 8,
  },
  pickerContainer: {
    width: '100%', 
    alignItems: 'left',
  },
  picker: {
    width: 300,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 5,
  },
  textInput: {
    height: 300,
    width: 400,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',

  },
  enviarButton: {
    width: 300,
    backgroundColor: Azul,
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,

  },
});




export const NuevaSolicitud = () => {
    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Nueva Solicitud"}/>
            <NuevaSolicitudForm />
        </View>
    )
};