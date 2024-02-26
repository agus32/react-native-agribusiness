import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { AppBarTab } from './AppBarTab';
import { usePerson } from '../context/PersonContext';
import { getApiData } from '../services/ApiHandler';
import { PersonInitials } from './PersonInitials';
import { NuevoChatColaborador } from '../Vistas/Colaborador/Chat/NuevoChatColaborador';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ChatListComponent = () => {
  const [contacts, setContacts] = useState([]);
  const {user} = usePerson();

 
  const getContacts = async () => {
    if(user.cedula){
    const response = await getApiData(`persona/${user.cedula}/chat`);
    setContacts(response);
  }
  };
  
 useEffect(() => {
    getContacts();
  }, []);

  const renderItem = ({ item }) => (
    <Link to={`/chat/${item.reciver}`} style={{alignItems:'center'}} underlayColor={1} activeOpacity={0.3}>
      <View style={styles.itemContainer}>
        <PersonInitials name={item.reciver_name} />
        <View style={styles.textContainer}>
          <Text style={styles.contactName}>{item.reciver_name}</Text>
        </View>
      </View>
    </Link>
  );

  const NuevoChatCliente = () => {
    return (
      <Link to={`/iniciarChat`} style={{alignItems:'center'}} underlayColor={1} activeOpacity={0.3}>
        <View style={styles.itemContainer}>
        <MaterialCommunityIcons name="chat-plus-outline" size={50} color="black" />
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
      ListHeaderComponent={user.rol === 'cliente' ? <NuevoChatCliente/> : <NuevoChatColaborador/>}
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
      width: '90%',
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
      marginLeft: 10,
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