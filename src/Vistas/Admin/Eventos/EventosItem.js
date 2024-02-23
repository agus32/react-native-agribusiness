import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EditEventoModal } from './EditEvento';
import { Azul, fechaParser} from '../../../constants/constants';


export const EventosItem = ({ evento, onDelete, onEdit }) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleConfirmarBorrar = () => {
    onDelete(evento.id_evento);
    setConfirmModalVisible(false);
  };
  const handleEnviarEdit = (evento,id_evento,imagen) => {
    onEdit(evento,id_evento,imagen);
    setEditModalVisible(false);
  };

  return (
    <View style={styles.eventoItem}>
      <View style={styles.imageContainer}>
        <Image source={evento.image ? {uri:evento.image} : require('../../../media/image-not-found.png')} style={styles.eventoImage} />
      </View>
      <View style={styles.eventoInfo}>
        <Text style={styles.eventoNombre}>{evento.titulo}</Text>
        <Text style={styles.eventoDesc}>
          <Text style={{ fontWeight: 'bold' }}>Fecha: </Text>
          {fechaParser(evento.fecha_creacion)}
        </Text>
        <Text style={styles.eventoDesc}>{evento.descripcion}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Pressable style={styles.icon} onPress={() => setEditModalVisible(true)}>
          <AntDesign name="edit" size={24} color="#2196F3" />
        </Pressable>
        <Pressable style={styles.icon} onPress={() => setConfirmModalVisible(true)}>
          <AntDesign name="delete" size={24} color="#FF5722" />
        </Pressable>
      </View>
      <ConfirmarBorrarModal
        isVisible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={handleConfirmarBorrar}
      />
      <EditEventoModal
        isVisible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onEnviar={handleEnviarEdit}
        evento={evento}
      />
    </View>
  );
};

const ConfirmarBorrarModal = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>¿Estás seguro que deseas borrar este evento?</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
            <Pressable style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  eventoItem: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 10,
    overflow: 'hidden',
  },
  eventoImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover', // o 'contain' dependiendo del efecto que desees
    borderRadius: 5,
  },
  eventoInfo: {
    flex: 2,
  },
  eventoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Azul,
  },
  eventoDesc: {
    fontSize: 14,
    color: '#757575',
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  icon: {
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});