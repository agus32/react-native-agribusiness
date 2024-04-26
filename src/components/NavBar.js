import React from 'react';
import { View, StyleSheet,Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Verde } from '../constants/constants';
import { Link } from 'react-router-native';

export const NavBar = () => {
   
  
    return (
      <View style={styles.navBar}>
        
          <Link style={styles.navItem} to="/" underlayColor={1} activeOpacity={0.3}>
          <View style={styles.navItem}>
            <Feather name="home" size={24} color="black" />
            <Text style={styles.navText}>Inicio</Text>
          </View>
          </Link>
        
          <Link style={styles.navItem} to="/perfil" underlayColor={1} activeOpacity={0.3}>
          <View style={styles.navItem}>
            <Feather name="user" size={24} color="black" />
            <Text style={styles.navText}>Perfil</Text>
          </View>
          </Link>

          <Link style={styles.navItem} to="/menu" underlayColor={1} activeOpacity={0.3}>
          <View style={styles.navItem}>
            <Feather name="menu" size={24} color="black" />
            <Text style={styles.navText}>Menú</Text>
          </View>
          </Link>

          <Link style={styles.navItem} to="/chat" underlayColor={1} activeOpacity={0.3}>
          <View style={styles.navItem}>
            <Feather name="message-square" size={24} color="black" />
            <Text style={styles.navText}>Chat</Text>
          </View>
          </Link>

      </View>
    );
  };
  
  const styles = StyleSheet.create({
    navBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: Verde,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: '100%',
      height: 70,
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
