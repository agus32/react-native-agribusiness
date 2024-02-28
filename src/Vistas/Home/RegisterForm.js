import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { Azul,Verde } from '../../constants/constants';
import { Link } from 'react-router-native';
import {Picker} from '@react-native-picker/picker';
import { PostWithoutToken } from '../../services/ApiHandler';

const initialState = {
  cedula: '',
  nombre: '',
  password: '',
  confirmarPassword: '',
  correo: '',
  direccion: '',
  telefono: '',
  zona: '',
};  

export const RegisterForm = () => {
    const [imputs, setImputs] = useState(initialState);

    const handleInputChange = (text, property) => {
        setImputs({
            ...imputs,
            [property]: text,
        });
    }

    const handleEnviar = async() => {
        if(imputs.password !== imputs.confirmarPassword) {
            Alert.alert(
                "Error",
                "Las contraseñas no coinciden",
            );
            return;
        }
        if(imputs.zona === '0') {
            Alert.alert(
                "Error",
                "Seleccione una zona",
            );
            return;
        }
        await PostWithoutToken("persona",{
            cedula: imputs.cedula,
            nombre: imputs.nombre,
            password: imputs.password,
            correo: imputs.correo,
            direccion: imputs.direccion,
            telefono: imputs.telefono,
            cod_zona: parseInt(imputs.zona),
            rol : 'cliente',
        });
        setImputs(initialState);
        
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Crear nueva cuenta</Text>
            <Text style={styles.label}>Cédula:</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={imputs.cedula} onChangeText={(text) => handleInputChange(text, 'cedula')}/>
            <Text style={styles.label}>Nombre y apellido:</Text>
            <TextInput style={styles.input} value={imputs.nombre} onChangeText={(text) => handleInputChange(text, 'nombre')}/>
            <Text style={styles.label}>Correo:</Text>
            <TextInput style={styles.input} value={imputs.correo} onChangeText={(text) => handleInputChange(text, 'correo')}/>
            <Text style={styles.label}>Dirección:</Text>
            <TextInput style={styles.input} value={imputs.direccion} onChangeText={(text) => handleInputChange(text, 'direccion')}/>
            <Text style={styles.label}>Teléfono:</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={imputs.telefono} onChangeText={(text) => handleInputChange(text, 'telefono')}/>
            <Text style={styles.label}>Zona:</Text>
            <Picker
              selectedValue={imputs.zona}
              onValueChange={(text) => handleInputChange(text, 'zona')}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="Selecciona una Zona" value="0" />
              <Picker.Item label="Zona 1" value="1" />
              <Picker.Item label="Zona 2" value="2" />
              <Picker.Item label="Zona 3" value="3" />
              <Picker.Item label="Zona 4" value="4" />
            </Picker>
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput style={styles.input} secureTextEntry={true} value={imputs.password} onChangeText={(text) => handleInputChange(text, 'password')}/>
            <Text style={styles.label}>Confirmar contraseña:</Text>
            <TextInput style={styles.input} secureTextEntry={true} value={imputs.confirmarPassword} onChangeText={(text) => handleInputChange(text, 'confirmarPassword')}/>
            <TouchableOpacity style={styles.loginButton} onPress={handleEnviar}>
                <Text style={styles.loginButtonText} >Registrarse</Text>
            </TouchableOpacity>
            <Link to="/login" style={{marginTop:20}} underlayColor={1} activeOpacity={0.3}>
                <Text>¿Ya tiene cuenta? <Text style={{textDecorationLine: 'underline'}}>Iniciar sesión</Text></Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', // Centrado horizontal
        paddingTop: 30,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 16,
        color: '#5A5A5A',
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 30,
        color: Verde,
        marginTop: 20,
    },
    input: {
        width: 300,
        height: 40,
        borderRadius: 10, // Menos redondeado
        backgroundColor: '#E1F5FE', // Fondo celeste
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    picker: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        backgroundColor: '#E1F5FE',
        overflow: 'hidden',
        paddingHorizontal: 15,
        marginBottom: 10,
      },
    loginButton: {
        backgroundColor: Azul,
        padding: 10,
        width: 300,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
