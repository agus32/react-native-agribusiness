import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet,Modal,Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EditProductoModal } from './EditProducto';
import { Azul} from '../../../constants/constants';
import { downloadFile } from '../../../services/DownloadHandler';

export const ProductoItem = ({ producto, onDelete, onEdit,proveedores }) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleConfirmarBorrar = () => {
    onDelete(producto.id_producto);
    setConfirmModalVisible(false);
  };
  const handleEnviarEdit = (nuevoProducto,id_producto,ficha,imagen) => {
    onEdit(nuevoProducto,id_producto,ficha,imagen);
    setEditModalVisible(false);
  }
  const handleDownload = async () => {
    try {
      await downloadFile(producto.ficha_tecnica);
    } catch (error) {
      console.error('Error al intentar compartir la imagen', error);
    }
  }

  return (
    <View style={styles.productoItem}>
      <View>
        <Image source={producto.portada ? {uri:producto.portada} : require('../../../media/image-not-found.png')} style={{ width: 120, height: 120,marginRight: 10, borderRadius: 5 }} />
      </View>
      <View>
        <Text style={styles.productoNombre}>{producto.nombre}</Text>
        <Text style={styles.productoDesc} numberOfLines={1} ellipsizeMode="tail" >{producto.descripcion}</Text>
        <Text style={styles.productoDesc}><Text style={{ fontWeight: 'bold' }}>Proovedor: </Text>{producto.nombre_proveedor}</Text>
        <Text style={styles.productoDesc} ><Text style={{ fontWeight: 'bold' }}>Presentacíon: </Text>{producto.presentacion}</Text>
        <Text style={styles.productoDesc}><Text style={{ fontWeight: 'bold' }}>Precio: </Text>{producto.precio}</Text>
        <Text style={styles.productoDesc}><Text style={{ fontWeight: 'bold' }}>IVA: </Text>{producto.iva}</Text>
        {producto.ficha_tecnica && 
          <Pressable onPress={handleDownload}>
            <Text style={styles.linkText}>Descargar Ficha Técnica</Text>
          </Pressable>
          }
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
      <EditProductoModal
        isVisible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onEnviar={handleEnviarEdit}
        producto={producto}
        proveedores={proveedores}
      />

    </View>
  );
};

const ConfirmarBorrarModal = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>¿Estás seguro que deseas borrar este producto?</Text>
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

  productoItem: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    flexDirection: 'row',

  },
  productoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Azul,
  },
  productoDesc: {
    fontSize: 14,
    color: '#757575',
    width: '90%',
  },
  linkText: {
    fontSize: 14,
    color: '#757575',
    textDecorationLine: 'underline',
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

