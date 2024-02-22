import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, ImageBackground } from 'react-native';
import { AppBarTab } from '../../../components/AppBarTab';
import { getApiData } from '../../../services/ApiHandler';
import { useNavigate } from "react-router-native";


const ChatComponent = () => {

    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hola, bienvenido al chatbot de Agribussiness Ecuador \n¿Cómo podemos ayudarte? \n 1. Información Técnica Comercial \n 2. Pedido',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Agribussiness Ecuador',
              avatar: require('../../../media/agrobusiness_logo.png'),
            },
          },
        ])
      }, [])


    const handleSelect = async (message) => {
        const response = await getApiData('chat/init?motivo='+message);
        if(response.cedula){
            navigate(`/chat/${response.cedula}`)
        }else{
            setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, {
                _id: new Date(),
                text: "No se encontró un representante disponible, por favor intente más tarde.",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Agribussiness Ecuador',
                    avatar: require('../../../media/agrobusiness_logo.png'),
                },
            }));
        }
    }


  const onSend = useCallback((newMessages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    if (newMessages[0].text.includes("1")) {
        handleSelect("informacion");
    }
    else{
    if (newMessages[0].text.includes("2")) {
        handleSelect("venta");
    }
    else{
        setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, {
            _id: new Date(),
            text: "Lo siento, no he entendido tu mensaje, digite \n 1. Información Técnica Comercial \n 2. Pedido",
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Agribussiness Ecuador',
                avatar: require('../../../media/agrobusiness_logo.png'),
            },
        }));
    }}
    }, []);

    

  

  return (
    <ImageBackground
      source={require('../../../media/fondo.png')}
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
          <GiftedChat
            messages={messages}
            onSend={(newMessages) => onSend(newMessages)}
            user={{
              _id: 1,
            }}
            placeholder="Escribe un mensaje..."
          />
      </View>
    </ImageBackground>
  );
};

export const IniciarChat = () => {
  return (
    <View style={{ width: '100%', flexGrow: 1 }}>
      <AppBarTab children={'Chat'} />
      <ChatComponent />
    </View>
  );
};
