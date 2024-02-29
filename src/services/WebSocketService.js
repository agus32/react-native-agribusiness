import { io } from 'socket.io-client';


const BASE_URL = 'epublit.com.ar:420';
const socket = io(`ws://${BASE_URL}/`);

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


