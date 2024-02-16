import React from 'react';
import { View, StyleSheet,Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Verde } from '../constants/constants';
import { Link } from 'react-router-native';

export const NavBar = () => {
   
  
    return (
      <View style={styles.navBar}>
        
        <Pressable
          style={styles.navItem}
          
        >
          <Link to="/">
          <View style={styles.navItem}>
            <Feather name="home" size={24} color="black" />
            <Text style={styles.navText}>Inicio</Text>
          </View>
          </Link>
        </Pressable>
        
        <Pressable
          style={styles.navItem}
        >
          <Link to="/perfil">
          <View style={styles.navItem}>
            <Feather name="user" size={24} color="black" />
            <Text style={styles.navText}>Perfil</Text>
          </View>
          </Link>
        </Pressable>
        <Pressable
          style={styles.navItem}
        >
          <Link to="/menu">
          <View style={styles.navItem}>
            <Feather name="menu" size={24} color="black" />
            <Text style={styles.navText}>Menú</Text>
          </View>
          </Link>
        </Pressable>
        <Pressable
          style={styles.navItem}
        >
          <Link to="/notificaciones">
          <View style={styles.navItem}>
            <Feather name="bell" size={24} color="black" />
            <Text style={styles.navText}>Notificaciones</Text>
          </View>
          </Link>
        </Pressable>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    navBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: Verde,//#c2d75f
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: '100%'
    },
    navItem: {
      flex: 1,
      alignItems: 'center',
    },
    navText: {
      marginTop: 5,
      fontSize: 12,
    },
  });
