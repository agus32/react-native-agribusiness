import { io } from 'socket.io-client';
import { useEffect,useState } from 'react';

const BASE_URL = 'epublit.com.ar:420';
const socket = io(`ws://${BASE_URL}/`);


export const useWebSocket = (token, cedula, onMessageReceived) => {
  const [previousMessages, setPreviousMessages] = useState([]);
  useEffect(() => {
    

    // Realizar un join a la sala con la persona que queremos enviar mensajes
    socket.emit('join', { token, cedula });

    // Escuchar los mensajes anteriores
    socket.on('firstMessages', (rawMessages) => {
      console.log(rawMessages);
      setPreviousMessages(rawMessages.data);
    });

    // Escuchar nuevos mensajes
    socket.on('message', (rawMessage) => {
      const { sender, message } = rawMessage;
      if (sender !== cedula) {
        onMessageReceived(`Tienes un nuevo mensaje de ${sender}: ${message}`);
      } else {
        console.log("Acabas de enviar un mensaje:", message);
      }
    });

    return () => {
      // Desconectar el socket al desmontar el componente o finalizar el hook
      socket.disconnect();
    };
  }, [token, cedula, onMessageReceived]);

  return {
    sendMessage: (message) => {
      socket.emit('message', message);
    },
    getPreviousMessages: () => previousMessages,
  };
};

