import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet,Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EditPersonaModal } from './EditPersona';

export const PersonaItem = ({ persona, onDelete, onEdit }) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleConfirmarBorrar = () => {
    onDelete(persona.cedula);
    setConfirmModalVisible(false);
  };
  const handleEnviarEdit = (nuevaPersona) => {
    onEdit(nuevaPersona);
    setEditModalVisible(false);
  }

  return (
    <View style={styles.personaItem}>
      <Text style={styles.personaNombre}>{persona.nombre}</Text>
      <Text style={styles.personaRol}>{persona.rol === 0 ? 'Colaborador' : 'Cliente'}</Text>
      <Text style={styles.personaCorreo}>{persona.correo}</Text>
      <View style={styles.personaZonaContainer}>
        <Text style={styles.personaZonaText}>Zona {persona.cod_zona}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Pressable onPress={() => setEditModalVisible(true)}>
          <AntDesign name="edit" size={24} color="#2196F3" />
        </Pressable>
        <Pressable onPress={() => setConfirmModalVisible(true)}>
          <AntDesign name="delete" size={24} color="#FF5722" />
        </Pressable>
      </View>
      <ConfirmarBorrarModal
        isVisible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={handleConfirmarBorrar}
      />
      <EditPersonaModal
        isVisible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onEnviar={handleEnviarEdit}
        persona={persona}
      />

    </View>
  );
};

const ConfirmarBorrarModal = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>¿Estás seguro que deseas borrar este usuario?</Text>
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

  personaItem: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  personaNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  personaRol: {
    fontSize: 14,
    color: '#757575',
    fontWeight: 'bold',
  },
  personaCorreo: {
    fontSize: 14,
    color: '#757575',
  },
  personaZonaContainer: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 5,
  },
  personaZonaText: {
    color: 'white',
    fontSize: 12,
  },

  iconContainer: {
    flexDirection: 'row',
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

