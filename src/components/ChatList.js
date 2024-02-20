import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image,StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { AppBarTab } from './AppBarTab';

const ChatListComponent = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {

    const response = [
        {
          "chat_id": 17,
          "reciver": "392142823",
          "reciver_name": "Manuel Variego"
        },
        {
            "chat_id": 16,
            "reciver": "348213902",
            "reciver_name": "juan ramon"
        },
        {
            "chat_id": 15,
            "reciver": "492183214",
            "reciver_name": "Juan ramon Alberto Jose"
        },
        {
            "chat_id": 13,
            "reciver": "2043491978",
            "reciver_name": "Juan ramon Alberto Jose"
        }
        // ...otros contactos
      ];
        setContacts(response);
  }, []);

  const renderItem = ({ item }) => (
    <Link to={`/chat/${item.reciver}`}>
      <View style={styles.itemContainer}>
        <Image source={require('../media/perfil.png')} style={styles.profilePic} />
        <View style={styles.textContainer}>
          <Text style={styles.contactName}>{item.reciver_name}</Text>
        </View>
      </View>
    </Link>
  );

  const NuevoChat = () => {
    return (
      <Link to={`/iniciarChat`}>
        <View style={styles.itemContainer}>
          <Image source={require('../media/perfil.png')} style={styles.profilePic} />
          <View style={styles.textContainer}>
            <Text style={styles.contactName}>Nuevo chat</Text>
          </View>
        </View>
      </Link>
    );
  };

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={(item) => item.chat_id}
      ListHeaderComponent={<NuevoChat/>}
      ListFooterComponent={<View style={{ height: 80 }}/>}
    />
  );
};


const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    profilePic: {
      width: 50,
      height: 50,
      borderRadius: 25, // Hacer la foto redonda
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
    },
    contactName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export const ChatList = () => {
    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Chat"}/>
            <ChatListComponent/>
        </View>
    )
};