import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, ImageBackground,ActivityIndicator } from 'react-native';
import { useWebSocket } from '../services/WebSocketService';
import { useParams } from 'react-router-native';
import { AppBarTab } from './AppBarTab';
import { usePerson } from '../context/PersonContext';




const ChatComponent = () => {

  const onMessageReceived = (sender, message) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, {
        _id: new Date(),
        text: message,
        createdAt: new Date(),
        user: {
          _id: parseInt(sender),
          avatar: require('../media/USUARIO.png')
        },
      })
    );
  };


    const {user} = usePerson();
    const { cedula } = useParams();
    const [messages, setMessages] = useState([]);
    const { joinRoom, sendMessage, getAllMessages, handleIncomingMessages, disconnectSocket } = useWebSocket(user.token,cedula, onMessageReceived);
    const [loading, setLoading] = useState(true);
  
    
    useEffect(() => {
      joinRoom();
      console.log('joining room');
      getAllMessages((previousMessages) => {
        console.log(previousMessages);
        const formattedMessages = previousMessages.map((msg) => ({
          _id: msg.created_at,
          text: msg.message,
          createdAt: new Date(msg.created_at),
          user: {
            _id: parseInt(msg.sender),
           avatar: require('../media/USUARIO.png')
          },
        }));
        setMessages(formattedMessages);
        setLoading(false);
      });
      handleIncomingMessages();
      return () => {
        disconnectSocket();
      };
    }, []);


  const onSend = useCallback((newMessages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    sendMessage(newMessages[0].text);
  }, []);

  

  return (
    <ImageBackground
      source={require('../media/fondo.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <View
        style={{
          flex: 1,
          marginBottom: 100,
          width: '80%',
          justifyContent:'center'
        }}
      >
        {loading ? (
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <GiftedChat
            messages={messages}
            onSend={(newMessages) => onSend(newMessages)}
            user={{
              _id: parseInt(user.cedula || '0'),
            }}
            placeholder="Escribe un mensaje..."
          />
        )}
      </View>
    </ImageBackground>
  );
};

export const Chat = () => {
  return (
    <View style={{ width: '100%', flexGrow: 1 }}>
      <AppBarTab children={'Chat'} />
      <ChatComponent />
    </View>
  );
};
