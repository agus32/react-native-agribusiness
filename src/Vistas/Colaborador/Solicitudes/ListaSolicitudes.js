import React,{useState} from 'react';
import { View, Text, StyleSheet,Pressable,Modal,TouchableOpacity} from 'react-native';
import { Azul,fechaParser } from '../../../constants/constants';
import { AppBarTab } from '../../../components/AppBarTab';

const SolicitudSalienteItem = ({ solicitud }) => {

  const sliceDescripcion = (descripcion) => {
    if (descripcion.length > 30) {
      return descripcion.substring(0, 30) + "...";
    } else {
      return descripcion;
    }
  }


  return (
    <View style={styles.card}>
      
      <Text style={styles.title}>Solicitud ID {solicitud.cod_solicitud}</Text>
      <Text>Fecha de Creación: {fechaParser(solicitud.fecha_creacion)}</Text>
      <Text>Solicitado: <Text style={{fontWeight: 'bold'}}>{solicitud.nombre_solicitado}</Text></Text>

      <View style={[styles.status, solicitud.aceptada === 0 ? styles.pendiente : styles.aprobada]}>
        <Text style={styles.statusText}>
          {solicitud.aceptada === 0 ? 'Pendiente' : 'Aprobada'}
        </Text>

      </View>
      <Text>Comentario: {sliceDescripcion(solicitud.descripcion)}</Text>
    </View>
  );
};


const SolicitudEntranteItem = ({ solicitud }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const sliceDescripcion = (descripcion) => {
    if (descripcion.length > 30) {
      return descripcion.substring(0, 30) + '...';
    } else {
      return descripcion;
    }
  };

  const handleAceptar = () => {
    Alert.alert('Solicitud Aceptada');
    setModalVisible(false)
  };


  return (
    <View style={styles.card}>
      <Text style={styles.title}>Solicitud ID {solicitud.cod_solicitud}</Text>
      <Text>Fecha de Creación: {fechaParser(solicitud.fecha_creacion)}</Text>
      <Text>
        Solicitado: <Text style={{ fontWeight: 'bold' }}>{solicitud.nombre_solicitado}</Text>
      </Text>
      <View style={[styles.status, solicitud.aceptada === 0 ? styles.pendiente : styles.aprobada]}>
        <Text style={styles.statusText}>
          {solicitud.aceptada === 0 ? 'Pendiente' : 'Aprobada'}
        </Text>
      </View>
      <Text>Comentario: {sliceDescripcion(solicitud.descripcion)}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.button}>Acciones</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Descripción Completa</Text>
            <Text>{solicitud.descripcion}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleAceptar}>
                <Text style={[styles.modalButton, { backgroundColor: 'green' }]}>Aceptar Solicitud</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButton, { backgroundColor: 'red' }]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};



export const ListaSolicitudes = () => {
  const [isEntrante, setIsEntrante] = useState(true);

  const listaSolicitudesSalientes = [
    {
      aceptada: 1,
      solicitado: "492183214",
      nombre_solicitado: "Juan Perez",
      descripcion: "Estoy cansado jefe, necesito unas vacaciones",
      solicitante: "392142823",
      cod_solicitud: 1,
      fecha_creacion: "2023-09-29T10:21:34.000Z",
    },
    {
      aceptada: 0,
      solicitado: "594823971",
      nombre_solicitado: "Maria Rodriguez",
      descripcion: "Solicitud de permiso para asistir a una capacitación",
      solicitante: "761238192",
      cod_solicitud: 2,
      fecha_creacion: "2023-09-30T14:45:00.000Z",
    },
    {
      aceptada: 1,
      solicitado: "123456789",
      nombre_solicitado: "Pedro Perez",
      descripcion: "Solicitud para trabajar desde casa",
      solicitante: "987654321",
      cod_solicitud: 3,
      fecha_creacion: "2023-10-01T08:00:00.000Z",
    },
    
  ];



  return (
    <View style={{width:'100%',flexGrow: 1}}>
      <AppBarTab children={"Estatus de Solicitudes"}/>
      <Pressable style={styles.filtro} onPress={() => setIsEntrante(!isEntrante)}>
            <Text style={{fontWeight: 'bold',fontSize: 20}}>{isEntrante ? 'Entrantes' : 'Salientes'}</Text>
      </Pressable>
      {isEntrante ? (
      listaSolicitudesSalientes.map((solicitud) => (
        <SolicitudEntranteItem key={solicitud.cod_solicitud} solicitud={solicitud} />
      ))) : (
        listaSolicitudesSalientes.map((solicitud) => (
        <SolicitudSalienteItem key={solicitud.cod_solicitud} solicitud={solicitud} />
      )))}
    </View>
  );
};






const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderColor: '#ccc', 
  },
  title: {
    color: Azul,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  status: {

    alignItems: 'center',
    justifyContent: 'start',
    borderRadius: 5,
    width: 80,
    marginTop: 3,
    marginBottom: 3,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pendiente: {
    backgroundColor: 'orange',
  },
  aprobada: {
    backgroundColor: 'green',
  },
  filtro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    marginTop: 15,
    width: 300,
  },
  button: {
    color: 'blue',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});


