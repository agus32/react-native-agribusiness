import React, { useState, useEffect } from 'react';
import { View, Text,Picker,StyleSheet,TouchableOpacity,Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getApiData } from '../../../services/ApiHandler';
import { useNavigate } from "react-router-native";




const ModalColaborador = ({modalVisible, setModalVisible}) => {
    const navigate = useNavigate();
    const [colaboradores, setColaboradores] = useState([]);
    const [selectedCedula, setSelectedCedula] = useState('-1');

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
                <Picker.Item label="Seleccione un Colaborador" value={'-1'} />
                {colaboradores.map((item) => (
                    <Picker.Item key={item.cedula} label={item.nombre} value={item.cedula} />
                ))}
            </Picker>
          
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity style={styles.boton} onPress={handleEnviar} >
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boton,{backgroundColor:'red'}]} onPress={() => setModalVisible(false)} >
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
        height: 50,
        width: '100%',
        marginBottom: 20,
      },
      boton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
      },
  });