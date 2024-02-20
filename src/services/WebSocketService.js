import { useEffect,useState } from 'react';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'epublit.com.ar:420';
const socket = io(`ws://${BASE_URL}/`);

export const useWebSocket = (token,cedula, onMessageReceived) => {

  

  const joinRoom = () => {
    socket.emit('join', { token, cedula });
    console.log('Socket conectado');
  };

  const sendMessage = (message) => {
    socket.emit('message', message);
  };

  const getAllMessages = (callback) => {
    console.log("Obteniendo mensajes");
    socket.on('firstMessages', (rawMessages) => {
      const messages = rawMessages.data || [];
      callback(messages);
    });
  };

  const handleIncomingMessages = () => {
    socket.on('message', (rawMessage) => {
      const { sender, message } = rawMessage;
      if (sender === cedula) {
        onMessageReceived(sender, message);
      } else {
        console.log("Acabas de enviar un mensaje:", message);
      }
    });
  };

  const disconnectSocket = () => {
    socket.disconnect();
    console.log('Socket desconectado');
  };

  return {
    joinRoom,
    sendMessage,
    getAllMessages,
    handleIncomingMessages,
    disconnectSocket,
  };
};


