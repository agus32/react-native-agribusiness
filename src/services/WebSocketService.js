import { io } from 'socket.io-client';
import { BASE_URL } from './ApiHandler';

const parsedURL = BASE_URL.replace(/^https?:\/\//, '');
const socket = io(`ws://${parsedURL}/`);

export const useWebSocket = (token,cedula, onMessageReceived) => {

  

  const joinRoom = () => {
    socket.connect();
    socket.emit('join', { token, cedula });
    
  };

  const sendMessage = (message) => {
    socket.emit('message', message);
  };

  const getAllMessages = (callback) => {
    
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
        
      }
    });
  };

  const disconnectSocket = () => {
    socket.disconnect();
    
  };

  return {
    joinRoom,
    sendMessage,
    getAllMessages,
    handleIncomingMessages,
    disconnectSocket,
  };
};


