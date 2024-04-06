import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,Pressable,Modal,TouchableOpacity,FlatList} from 'react-native';
import { Azul,fechaParser, getInitials} from '../../../constants/constants';
import { AppBarTab } from '../../../components/AppBarTab';
import { getApiData, postApiData } from '../../../services/ApiHandler';
import { usePerson } from '../../../context/PersonContext';

const SolicitudItem = ({ solicitud,tipo }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const sliceDescripcion = (descripcion) => {
    if (descripcion.length > 30) {
      return descripcion.substring(0, 30) + '...';
    } else {
      return descripcion;
    }
  };

  const handleAceptar = async() => {
    const response = await postApiData(`solicitud/${solicitud.cod_solicitud}/aceptar`, {});
    if(response.success) solicitud.aceptada = 1;  
    setModalVisible(false)
  };


  return (
    <View style={styles.card}>
      {tipo === 'entrante' ? (
      <Text style={styles.title}>Solicitud {getInitials(solicitud.nombre_solicitante)} - {solicitud.cod_solicitud}</Text>
      ):(
        <Text style={styles.title}>Solicitud {getInitials(solicitud.nombre_solicitado)} - {solicitud.cod_solicitud}</Text>
      )
      }

      <Text>Fecha de Creación: {fechaParser(solicitud.fecha_creacion)}</Text>

      {tipo === 'entrante' ? (    
      <Text>Solicitante: <Text style={{ fontWeight: 'bold' }}>{solicitud.nombre_solicitante}</Text></Text>
      ):(
      <Text>Solicitado: <Text style={{fontWeight: 'bold'}}>{solicitud.nombre_solicitado}</Text></Text>
      )
      }
      
      <View style={[styles.status, solicitud.aceptada === 0 ? styles.pendiente : styles.aprobada]}>
        <Text style={styles.statusText}>
          {solicitud.aceptada === 0 ? 'Pendiente' : 'Aprobada'}
        </Text>
      </View>
      <Text>Asunto: {solicitud.asunto ? sliceDescripcion(solicitud.asunto) : "Sin asunto"}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.button}>Ver mas</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {tipo === 'entrante' ? (
            <Text style={styles.modalTitle}>Solicitud {getInitials(solicitud.nombre_solicitante)} - {solicitud.cod_solicitud}</Text>
            ):(
              <Text style={styles.modalTitle}>Solicitud {getInitials(solicitud.nombre_solicitado)} - {solicitud.cod_solicitud}</Text>
            )
            }
            <Text><Text style={{fontWeight: 'bold'}}>Asunto: </Text>{solicitud.asunto ? solicitud.asunto : "Sin asunto"}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Descripción: </Text>{solicitud.descripcion}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Solución: </Text>{solicitud.solucion ? solicitud.solucion : "Sin solución"}</Text>
            <View style={styles.modalButtons}>
              {tipo === 'entrante' ? (
              <>
              <TouchableOpacity onPress={handleAceptar}>
                <Text style={[styles.modalButton, { backgroundColor: 'green' }]}>Aceptar Solicitud</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButton, { backgroundColor: 'red' }]}>Cancelar</Text>
              </TouchableOpacity>
              </>
              ) :(
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButton, { backgroundColor: 'red'}]}>Cerrar</Text>
              </TouchableOpacity>
              )}
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
  const {user} = usePerson();

  const getSolicitudes = async () => {
    if (user) {
      const response = await getApiData(`persona/${user.cedula}/solicitud?tipo=enviada`);
      setSalientes(response);    
      const response2 = await getApiData(`persona/${user.cedula}/solicitud?tipo=recibida`);
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
            <SolicitudItem solicitud={item} tipo={"entrante"}/>
          )}
          keyExtractor={(item) => item.cod_solicitud}
          ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>No hay solicitudes entrantes.</Text>
                              </View>}
      />
      ) : (
        <FlatList
          data={salientes}
          renderItem={({item}) => (
            <SolicitudItem solicitud={item} tipo={"saliente"}/>
          )}
          keyExtractor={(item) => item.cod_solicitud}
          ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>No hay solicitudes salientes.</Text>
                              </View>}
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
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});


