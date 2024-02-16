import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,Pressable,Modal,TouchableOpacity,FlatList} from 'react-native';
import { Azul,fechaParser, getInitials} from '../../../constants/constants';
import { AppBarTab } from '../../../components/AppBarTab';
import { getApiData, postApiData } from '../../../services/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SolicitudSalienteItem = ({ solicitud }) => {

  const sliceDescripcion = (descripcion) => {
    console.log()
    if (descripcion.length > 30) {
      return descripcion.substring(0, 30) + "...";
    } else {
      return descripcion;
    }
  }

  return (
    <View style={styles.card}>
      
      <Text style={styles.title}>Solicitud {getInitials(solicitud.nombre_solicitado)} - {solicitud.cod_solicitud}</Text>
      <Text>Fecha de Creación: {fechaParser(solicitud.fecha_creacion)}</Text>
      <Text>Solicitado: <Text style={{fontWeight: 'bold'}}>{solicitud.nombre_solicitado}</Text></Text>

      <View style={[styles.status, solicitud.aceptada === 0 ? styles.pendiente : styles.aprobada]}>
        <Text style={styles.statusText}>
          {solicitud.aceptada === 0 ? 'Pendiente' : 'Aprobada'}
        </Text>

      </View>
      <Text>Comentario: {sliceDescripcion(solicitud.descripcion)} </Text>
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
    postApiData(`solicitud/${solicitud.cod_solicitud}/aceptar`, {})
    solicitud.aceptada = 1;  
    setModalVisible(false)

  };


  return (
    <View style={styles.card}>
      <Text style={styles.title}>Solicitud {getInitials(solicitud.nombre_solicitante)} - {solicitud.cod_solicitud}</Text>
      <Text>Fecha de Creación: {fechaParser(solicitud.fecha_creacion)}</Text>
      <Text>
        Solicitante: <Text style={{ fontWeight: 'bold' }}>{solicitud.nombre_solicitante}</Text>
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
  const [entrantes, setEntrantes] = useState([]);
  const [salientes, setSalientes] = useState([]);

  const getSolicitudes = async () => {

    const loggedUser = await AsyncStorage.getItem('loggedUser');
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      const response = await getApiData(`persona/${parsedUser.cedula}/solicitud?tipo=enviada`);
      setSalientes(response);      
      const response2 = await getApiData(`persona/${parsedUser.cedula}/solicitud?tipo=recibida`);
      setEntrantes(response2);

  }}

  useEffect(() => {
    getSolicitudes();
  }, []);




  return (
    <View style={{width:'100%',flexGrow: 1}}>
      <AppBarTab children={"Estatus de Solicitudes"}/>
      <Pressable style={styles.filtro} onPress={() => setIsEntrante(!isEntrante)}>
            <Text style={{fontWeight: 'bold',fontSize: 20}}>{isEntrante ? 'Entrantes' : 'Salientes'}</Text>
      </Pressable>
      <View style={styles.container}>
      {isEntrante ? (
        <FlatList
          data={entrantes}
          renderItem={({item}) => (
            <SolicitudEntranteItem solicitud={item} />
          )}
          keyExtractor={(item) => item.cod_solicitud}
          ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>No hay solicitudes entrantes.</Text>
                              </View>}
          ListFooterComponent={<View style={{ height: 120 }}/>}
      />
      ) : (
        <FlatList
          data={salientes}
          renderItem={({item}) => (
            <SolicitudSalienteItem solicitud={item} />
          )}
          keyExtractor={(item) => item.cod_solicitud}
          ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>No hay solicitudes salientes.</Text>
                              </View>}
          ListFooterComponent={<View style={{ height: 120 }}/>}
      />
      )}
      </View>
    </View>
  );

  
  
};






const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
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
    width: '30%',
    marginTop: 3,
    marginBottom: 3,
    padding: 3,
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


