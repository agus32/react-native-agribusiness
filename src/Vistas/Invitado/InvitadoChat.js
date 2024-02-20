import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { AppBarTab } from '../../components/AppBarTab';




export const InvitadoChat = () => {
    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Chat"}/>
            <View style={styles.centeredView}>
                <Text style={styles.centeredText}>Por el momento, el chat es exclusivo para clientes.</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredText: {
      fontSize: 18,
      color: '#333',
      textAlign: 'center',
      maxWidth: 300,
      margin: 20,
    },
  });