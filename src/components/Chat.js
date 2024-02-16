import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, ImageBackground } from 'react-native'
import { useWebSocket } from '../services/WebSocketService'
import { useParams } from 'react-router-native';
import { AppBarTab } from './AppBarTab';
/**
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWR1bGEiOiIzIiwibm9tYnJlIjoiSnVhbiBQZXJleiBUaWNhIiwicm9sIjoiY2xpZW50ZSIsImlhdCI6MTcwNzQwNDMyNywiZXhwIjoxNzEyNTg4MzI3fQ.9Tm-G5veGJ9E1zxNC7aZ7LZz9IcF0aicWeegs2QaMYM';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
 // const { cedula } = useParams();
  const { sendMessage,getPreviousMessages } = useWebSocket(token,'348213902',onMessageReceived)
  

  useEffect(() => {
    const previousMessages = getPreviousMessages();

    const formattedMessages = previousMessages.map((msg) => ({
      _id: msg.created_at, // Puedes usar el timestamp o cualquier otro identificador único
      text: msg.message,
      createdAt: new Date(msg.created_at),
      user: {
        _id: msg.sender,
        name: msg.sender, // Puedes personalizar esto según tus necesidades
      },
    }));

    setMessages(formattedMessages);
  }, []);

  const onSend = useCallback((messages = []) => {
    
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    sendMessage(messages[0].text);
    console.log(messages);
  }, [])

  const onMessageReceived = useCallback((message) => {
  
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, message),
    )
    
    console.log(message);
  }
  , [])

  return (
    <ImageBackground
      source={require('../media/fondo.png')}
      style={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}}
    >
    
    </ImageBackground>
  )
}
 */

export const Chat = () => {
  return (
      <View style={{ width: '100%',flexGrow: 1 }}>
          <AppBarTab children={"Chat"}/>
          <ChatComponent />
      </View>
  )
};




const ChatComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}