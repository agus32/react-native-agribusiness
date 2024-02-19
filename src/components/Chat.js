import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, ImageBackground,Text } from 'react-native';
import { useWebSocket } from '../services/WebSocketService';
import { useParams } from 'react-router-native';
import { AppBarTab } from './AppBarTab';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWR1bGEiOiIzIiwibm9tYnJlIjoiSnVhbiBQZXJleiBUaWNhIiwicm9sIjoiY2xpZW50ZSIsImlhdCI6MTcwNzQwNDMyNywiZXhwIjoxNzEyNTg4MzI3fQ.9Tm-G5veGJ9E1zxNC7aZ7LZz9IcF0aicWeegs2QaMYM';

const ChatComponent = () => {

  const onMessageReceived = (sender, message) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, {
        _id: new Date(),
        text: message,
        createdAt: new Date(),
        user: {
          _id: parseInt(sender),
          //name: sender,
        },
      })
    );
  };
    const { cedula } = useParams();
    const [messages, setMessages] = useState([]);
    const { joinRoom, sendMessage, getAllMessages, handleIncomingMessages, disconnectSocket } = useWebSocket(token, cedula, onMessageReceived);
    const [loading, setLoading] = useState(true);
  
    
    useEffect(() => {
      joinRoom();
      console.log("Montado");
      getAllMessages((previousMessages) => {
        console.log("a");
        const formattedMessages = previousMessages.map((msg) => ({
          _id: msg.created_at,
          text: msg.message,
          createdAt: new Date(msg.created_at),
          user: {
            _id: parseInt(msg.sender),
           // name: msg.sender,
           avatar: require('../media/USUARIO.png')
          },
        }));
        setMessages(formattedMessages);
        console.log("Mensajes", formattedMessages);
        setLoading(false);
      });
      handleIncomingMessages();
      return () => {
        disconnectSocket();
        console.log("Desmontado");
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
        }}
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <GiftedChat
            messages={messages}
            onSend={(newMessages) => onSend(newMessages)}
            user={{
              _id: 3,
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
