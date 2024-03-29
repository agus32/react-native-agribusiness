import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native';
import { usePerson } from '../../context/PersonContext';
import { Link } from 'react-router-native';

export const LoginScreen = () => {

  const {doLogin} = usePerson();

  const [imputs, setImputs] = useState({
    cedula: '',
    password: '',
  });

  const handleInputChange = (text, property) => {
    setImputs({
      ...imputs,
      [property]: text,
    });
  }

  const handleEnviar = async() => {
    doLogin(imputs);  
  }


  return (
    <View style={styles.container}>
      <Image
        source={require('../../media/agrobusiness_logo.png')}
        style={styles.logo}
      />
      <Text style={styles.label}>Usuario:</Text>
      <TextInput style={styles.input} value={imputs.cedula} onChangeText={(text) => handleInputChange(text, 'cedula')}/>
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput style={styles.input} secureTextEntry={true}  value={imputs.password} onChangeText={(text) => handleInputChange(text, 'password')}/>
    { /**  <Pressable style={styles.forgotPasswordLink}>
        <Text style={styles.forgotPasswordText}>Olvidé mi contraseña</Text>
      </Pressable>*/}
      <Pressable style={styles.loginButton}>
        <Text style={styles.loginButtonText} onPress={handleEnviar}>Iniciar sesión</Text>
      </Pressable>
      <Link to="/register" style={styles.signupLink} underlayColor={1} activeOpacity={0.3}>
        <Text style={styles.signupText}>¿No tiene cuenta? <Text style={styles.signupLinkText}>Regístrese aquí</Text></Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Centrado horizontal
    paddingTop: 30,
    backgroundColor: 'white',
  },
  logo: {
    marginTop: 30,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
    
  },
  input: {
    width: 300,
    height: 40,
    borderRadius: 10, // Menos redondeado
    backgroundColor: '#E1F5FE', // Fondo celeste
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  forgotPasswordLink: {
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  forgotPasswordText: {
    fontSize: 12,
    textDecorationLine: 'underline',
    
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 60,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  signupLink: {
    marginTop: 60,
  },
  signupText: {
    fontSize: 14,
  },
  signupLinkText: {

    textDecorationLine: 'underline', // Subrayado
  },
});



