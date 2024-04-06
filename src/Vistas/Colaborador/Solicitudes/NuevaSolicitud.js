import React, { useState, useEffect } from 'react';
import { AppBarTab } from '../../../components/AppBarTab';
import { Azul} from '../../../constants/constants';
import { postApiData,getApiData} from '../../../services/ApiHandler';
import { View, TextInput, TouchableOpacity, StyleSheet,Text,ImageBackground,ActivityIndicator,ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { usePerson } from '../../../context/PersonContext';

const NuevaSolicitudForm = () => {
  const {user} = usePerson();
  const [colaboradores, setColaboradores] = useState([]);
  const [solicitado, setSolicitado] = useState("");
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [solucion, setSolucion] = useState("");
  const [loading, setLoading] = useState(true);

  
  const getColaboradores = async () => {
    if (user.cedula) {
      const data = await getApiData(`persona/${user.cedula}/solicitables`);
      setColaboradores(data);
      setLoading(false);
  }}

  
  useEffect(() => { 
    getColaboradores();
  }, []);

  const handleEnviar = async() => {
    await postApiData('solicitud',{ solicitado, descripcion, asunto, solucion});
    setSolicitado("");
    setAsunto("");
    setSolucion("");
    setDescripcion("");
  };



  return (
    <ImageBackground style={styles.container} source={require('../../../media/fondo.png')}>
      {loading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      colaboradores && colaboradores.length > 0 ? (
        
        <View style={styles.formContainer}>
        <ScrollView >
        <Text style={styles.texto}>Destinatario:</Text>
        <Picker
          selectedValue={solicitado}
          style={styles.picker}
          onValueChange={(itemValue) => setSolicitado(itemValue)}
        >
          <Picker.Item label="Seleccione un colaborador" value="" />
          {colaboradores.map((item) => (
            <Picker.Item key={item.cedula} label={item.nombre} value={item.cedula} />
          ))}
        </Picker>
        {solicitado !== "" && 
          <Text style={styles.texto}>Cargo: {colaboradores.find((item) => item.cedula === solicitado).cargo}</Text>
        }

      <Text style={styles.texto}>Asunto:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Ingrese el asunto aquí..."
        value={asunto}
        onChangeText={setAsunto}
      />
      <Text style={styles.texto}>Descripcion:</Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={4}
        placeholder="Ingrese la descripcion aquí..."
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Text style={styles.texto}>Solución:</Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={2}
        placeholder="Ingrese la solucion aquí..."
        value={solucion}
        onChangeText={setSolucion}
      />
      <TouchableOpacity style={styles.enviarButton} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar Solicitud</Text>
      </TouchableOpacity>
      </ScrollView>
      </View>
      ) : (
        <Text> No tienes colaboradores por encima de tu cargo para hacerle solicitudes.</Text>
      )
    )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    margin: 16, // Ajusta el margen según tus preferencias
    padding: 16, // Ajusta el padding según tus preferencias
    backgroundColor: 'white', // Color de fondo del container secundario
    borderRadius: 10, // Bordes redondeados
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },

  },
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
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 5,
  },
  textInput: {

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
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonText: {
    alignSelf: 'center',
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