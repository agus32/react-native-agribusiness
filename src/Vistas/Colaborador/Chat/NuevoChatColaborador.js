import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getApiData } from '../../../services/ApiHandler';
import { useNavigate } from "react-router-native";
import {Picker} from '@react-native-picker/picker';
import { Azul } from '../../../constants/constants';



const ModalColaborador = ({modalVisible, setModalVisible}) => {
    const navigate = useNavigate();
    const [colaboradores, setColaboradores] = useState([]);
    const [selectedCedula, setSelectedCedula] = useState('');

    const fetchColaboradores = async () => {
        const response = await getApiData('persona?rol=colaborador');
        setColaboradores(response);
    }


    useEffect(() => {
        fetchColaboradores();
    }
    , []);

    const handleEnviar = () => {
        if(selectedCedula !== '-1'){
            setModalVisible(false);
            navigate(`/chat/${selectedCedula}`);
        }
        setSelectedCedula('');
    }
    const handleCancelar = () => {
        setModalVisible(false);
        setSelectedCedula('');
    }

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Empezar chat con colaborador</Text>
            <Picker
            selectedValue={selectedCedula}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCedula(itemValue)}
            >
                <Picker.Item label="Seleccione un Colaborador" value={''} />
                {colaboradores.map((item) => (
                    <Picker.Item key={item.cedula} label={item.nombre} value={item.cedula} />
                ))}
            </Picker>
          
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity style={styles.boton} onPress={handleEnviar} >
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boton,{backgroundColor:'red'}]} onPress={handleCancelar} >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>
        </Modal>
    );
}



export const NuevoChatColaborador = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <ModalColaborador modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <TouchableOpacity style={{alignItems:'center'}} onPress={() => setModalVisible(true)}>
                <View style={styles.itemContainer}>
                <MaterialCommunityIcons name="chat-plus-outline" size={50} color="black" />
                <View style={styles.textContainer}>
                    <Text style={styles.contactName}>Nuevo chat</Text>
                </View>
                </View>
            </TouchableOpacity>
        </View>
    );
  };


  const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '90%',
      },
      textContainer: {
        flex: 1,
      },
      contactName: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
      },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      picker: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 5,
        backgroundColor: 'white',
        overflow: 'hidden',
        padding: 10,
        marginBottom: 15,
      },
      boton: {
        backgroundColor: Azul,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
  });