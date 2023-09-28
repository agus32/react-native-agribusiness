import React from 'react';
import { Modal, View, Text, Pressable, Image } from 'react-native';

const CustomAlertModal = ({ isVisible, type, message, onClose }) => {
  const getIcon = () => {
    if (type === 'error') {
      return require('./error-icon.png'); // Reemplaza con la ruta de tu icono de error
    } else if (type === 'success') {
      return require('./success-icon.png'); // Reemplaza con la ruta de tu icono de éxito
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <Image
            source={getIcon()}
            style={{ width: 64, height: 64, alignSelf: 'center' }}
          />

          <Text style={{ textAlign: 'center', marginTop: 10 }}>{message}</Text>

          <Pressable
            style={{
              backgroundColor: type === 'error' ? 'red' : 'green',
              padding: 10,
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={onClose}
          >
            <Text style={{ color: 'white' }}>Aceptar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlertModal;