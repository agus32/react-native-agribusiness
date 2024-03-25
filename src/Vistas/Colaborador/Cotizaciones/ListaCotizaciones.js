import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,FlatList,Modal,TouchableOpacity} from 'react-native';
import { Azul,fechaParser } from '../../../constants/constants';
import { AppBarTab } from '../../../components/AppBarTab';
import { getApiData } from '../../../services/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DownloadAndShare} from '../../../services/DownloadHandler';
import {Link} from 'react-router-native'; 



const CotizacionItem = ({ cotizacion }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const sliceDescripcion = (descripcion) => {
        if (descripcion.length > 30) {
        return descripcion.substring(0, 30) + "...";
        } else {
        return descripcion;
        }
    }


    const handleShare = async () => {
      try {
        await DownloadAndShare(cotizacion.file);
      } catch (error) {
        console.error('Error al intentar compartir la imagen', error);
      }
    };
  


  return (
    <View style={styles.card}>
      
      <Text style={styles.title}>Cotizacion N°{cotizacion.nro_cotizacion}</Text>
      <Text>Fecha de Creación: {fechaParser(cotizacion.fecha_creacion)}</Text>
      <Text>Cliente: <Text style={{fontWeight: 'bold'}}>{cotizacion.cliente?.nombre}</Text></Text>

      <View style={[styles.status,styles.aprobada]}>
        <Text style={styles.statusText}>
          {cotizacion.forma_pago}
        </Text>       
      </View>
      <Text>Tiempo de entrega: {cotizacion.tiempo_entrega} día(s)</Text>
      <Text>Disposiciones: {sliceDescripcion(cotizacion.disposiciones)}</Text>

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
            <Text style={styles.modalTitle}>Disposiciones</Text>
            <Text>{cotizacion.disposiciones}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleShare}>
                <Text style={[styles.modalButton, { backgroundColor: 'green' }]}>Descargar PDF</Text>
              </TouchableOpacity>
              <Link to={`/cotizaciones/editar/${cotizacion.nro_cotizacion}`}>
                <Text style={[styles.modalButton, { backgroundColor: Azul }]}>Editar</Text>
              </Link>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButton, { backgroundColor: 'red' }]}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    
  );
};





export const ListaCotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState([]);

  const getCotizaciones = async () => {
    const loggedUser = await AsyncStorage.getItem('loggedUser');
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      const data = await getApiData(`persona/${parsedUser.cedula}/cotizacion`);
      setCotizaciones(data);
  }
  };

  useEffect(() => {
    getCotizaciones();
  }, []);




  return (
    <View style={{width:'100%',flexGrow: 1}}>
      <AppBarTab children={"Cotizaciones Anteriores"}/> 
      <View style={styles.container}>
      <FlatList
        data={cotizaciones}
        renderItem={({item}) => (
          <CotizacionItem cotizacion={item} />
        )}
        keyExtractor={(item) => item.nro_cotizacion}
        ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                              <Text>No hay cotizaciones</Text>
                            </View>}
        ListFooterComponent={<View style={{ height: 120 }}/>}
      />
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
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});


