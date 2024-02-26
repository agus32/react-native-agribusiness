import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Link } from "react-router-native"

export const ClienteInicio = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../media/PORTADA-CLIENTE.jpg')} style={styles.image} />

      <View style={styles.overlay}>
        <Text style={styles.boldText}>BIENVENIDO A</Text>
        <Text style={styles.secondayText}>Agribusiness</Text>
        <Text style={styles.secondayText}>Ecuador</Text>
      </View>


        <View style={[styles.linkContainer, {marginBottom:80}]}>
        <Link to="/eventos" style={styles.link} underlayColor={1} activeOpacity={0.3}>
        <View>
            <Image source={require('../../media/eventos.png')} style={styles.linkImage} />
            <Text style={styles.linkText}>Eventos</Text>
          </View>
        </Link >
        <Link to="/productos" style={styles.link} underlayColor={1} activeOpacity={0.3}>     
          <View>
            <Image source={require('../../media/LOGO-PRODUCTO.png')} style={styles.linkImage} />
            <Text style={styles.linkText}>Productos</Text>
          </View>
        </Link>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    flexGrow: 1,

  },
  image: {
    width: '100%',
    height: '67%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '67%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 10,
    color: 'white',
  },
  secondayText:{
    fontSize:50,
    color: 'white',
  },
  linkContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width:'100%',
    flex: 1,
  },
  link: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  linkText: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  linkImage: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
