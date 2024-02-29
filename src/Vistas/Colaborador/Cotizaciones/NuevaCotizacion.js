import React, { useState, useEffect} from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text, ScrollView,StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { AppBarTab } from '../../../components/AppBarTab';
import { getApiData, postApiData } from '../../../services/ApiHandler';
import { Azul} from '../../../constants/constants';
import { CotizacionModal } from './CotizacionModal';


const NuevaCotizacionForm = () => {
  const [cotizacionData, setCotizacionData] = useState({
    cliente: '',
    formaPago: 'Contado', // Valor por defecto
    tiempoEntrega: '',
    disposiciones: '',
  });
  const [personas, setPersonas] = useState([]);
  const [productosList, setProductosList] = useState([]);
  const [productos, setProductos] = useState([]);
  const [proveedor, setProveedor] = useState('');
  const [clienteDesconocido, setClienteDesconocido] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    id_producto: -1,
    cantidad: '',
    precio_final: '',
  });
  const [compartirModal, setCompartirModal] = useState(false);
  const [file, setFile] = useState(null);



  const getProductos = async () => {
    const response = await getApiData('producto'); 
    setProductosList(response);
  };
  const getPersonas = async () => {
    const response = await getApiData('persona?rol=cliente'); 
    setPersonas(response);
  };

  useEffect(() => {   
    getProductos(); 
    getPersonas();
  }, []);

  const agregarProducto = () => {
    if (nuevoProducto.id_producto && nuevoProducto.cantidad) {
      setProductos([...productos, {
        id_producto: nuevoProducto.id_producto,
        cantidad: parseInt(nuevoProducto.cantidad),
        precio_final: parseFloat(nuevoProducto.precio_final),
      }]);
      setNuevoProducto({ id_producto: -1, cantidad: '', precio_final: '' });
      setModalVisible(false);
    }
  };


  const enviarCotizacion = async () => {


      const body ={
        forma_pago: cotizacionData.formaPago,
        tiempo_entrega: parseInt(cotizacionData.tiempoEntrega),
        disposiciones: cotizacionData.disposiciones,
        productos,
      };
      if(cotizacionData.cliente === '.') body.cliente_nuevo = clienteDesconocido;
      else body.cliente = cotizacionData.cliente;

      const response = await postApiData('cotizacion',body);
      if(response.success){
        setFile(response.data.file);
        setCompartirModal(true);
        setCotizacionData({ cliente: '', formaPago: 'Contado', tiempoEntrega: '', disposiciones: '', });
        setClienteDesconocido('');
        setProductos([]);
      }
    
    }

    const handleProductoChange = (id) => {
        
        if(id === -1) setProveedor('');
        else{
          const producto = productosList.find((item) => item.id_producto === parseInt(id));
          setNuevoProducto({ ...nuevoProducto, id_producto: producto.id_producto, precio_final: producto.precio });
          setProveedor(producto.nombre_proveedor);}
      }

  return (
    <ScrollView>
    <View style={styles.container}>

        <CotizacionModal isVisible={compartirModal} onClose={() => setCompartirModal(false)} file={file}/>
        <Picker
        selectedValue={cotizacionData.cliente}
        style={styles.picker}
        onValueChange={(itemValue) => setCotizacionData({ ...cotizacionData, cliente: itemValue })}
        >
        <Picker.Item label="Seleccione un cliente" value="" />
        <Picker.Item label="Cliente no registrado" value="." />
        {personas.map((item) => (
            <Picker.Item key={item.cedula} label={item.nombre} value={item.cedula} />
        ))}
        </Picker>
        {cotizacionData.cliente !== '.' && cotizacionData.cliente !== '' && 
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Cedula: {personas.find((item) => item.cedula === cotizacionData.cliente)?.cedula}</Text>
        }
        {cotizacionData.cliente === '.' && <TextInput
          style={styles.input}
          placeholder="Cliente no registrado"
          value={clienteDesconocido}
          onChangeText={(text) => setClienteDesconocido(text)}
        />}
    
        <TouchableOpacity style={styles.boton} onPress={() => setModalVisible(true)} >
        <Text style={styles.buttonText}>Agregar Producto</Text>
        </TouchableOpacity>

        

        <TablaCotizacion productos={productos} setProductos={setProductos} productosList={productosList}/>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
        
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Producto</Text>
            <Picker
          selectedValue={nuevoProducto.id_producto}
          style={styles.picker}
          onValueChange={(id) => handleProductoChange(id)}
          >
          <Picker.Item label="Seleccione un Producto" value={-1} />
          {productosList.map((item) => (
              <Picker.Item key={item.id_producto} label={item.nombre} value={item.id_producto} />
          ))}
          </Picker>
          {proveedor && <Text style={{ fontSize: 16, marginBottom: 10 }}>Proveedor: {proveedor}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              value={nuevoProducto.cantidad}
              onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, cantidad: text })}
              keyboardType="numeric"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Precio Final"
              value={nuevoProducto.precio_final}
              onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, precio_final: text })}
              inputMode='decimal'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity style={styles.boton} onPress={agregarProducto} >
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boton,{backgroundColor:'red'}]} onPress={() => setModalVisible(false)} >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>
        </Modal>

      <TextInput
            style={[styles.input,{marginTop:10}]}
            placeholder="Disposiciones"
            multiline={true}
            numberOfLines={4}
            value={cotizacionData.disposiciones}
            onChangeText={(text) => setCotizacionData({ ...cotizacionData, disposiciones: text })}
            /> 
      <Picker
        selectedValue={cotizacionData.formaPago}
        style={styles.picker}
        onValueChange={(itemValue) => setCotizacionData({ ...cotizacionData, formaPago: itemValue })}
      >
        <Picker.Item label="Contado" value="Contado" />
        <Picker.Item label="Credito 15" value="Credito 15" />
        <Picker.Item label="Credito 30" value="Credito 30" />
        <Picker.Item label="Credito 45" value="Credito 45" />
      </Picker>

      <View style={styles.tiempoEntregaContainer}>
        <Text style={styles.textoDias}>Tiempo de entrega (días):</Text>
          <TextInput
            style={styles.tiempoEntregaInput}
            value={cotizacionData.tiempoEntrega}
            onChangeText={(text) => setCotizacionData({ ...cotizacionData, tiempoEntrega: text })}
            keyboardType="numeric"
          />

      </View>


      <TouchableOpacity style={styles.boton} onPress={enviarCotizacion} >
        <Text style={styles.buttonText}>Guardar Cotización</Text>
      </TouchableOpacity>

    </View>
    <View style={{height:100}}></View>
    </ScrollView>

  );
};



const TablaCotizacion = ({ productos,setProductos,productosList}) => {
    if (!productos || productos.length === 0) {
      return null;
    }
  
    const calcularSubTotal = () => {
      return productos.reduce((total, producto) => {
        const precioFinal = producto.precio_final || 0;
        return total + producto.cantidad * precioFinal;
      }, 0);
    };

    const calcularTotal = () => {     
      return productos.reduce((total, producto) => {
        const prodList = productosList.find((item) => item.id_producto === parseInt(producto.id_producto));
        const precioFinal = producto.precio_final || 0;
        return total + producto.cantidad * precioFinal*(1+(prodList.iva/100));
      }, 0);
    };

    const getNombreProducto = (id) => {
        const producto = productosList.find((item) => item.id_producto === parseInt(id));
        return producto.nombre;
      }

    const quitarProducto = (index) => {
        const nuevosProductos = [...productos];
        nuevosProductos.splice(index, 1);
        setProductos(nuevosProductos);
        }
  
    return (
      <View style={styles.tablaContainer}>
        <View style={styles.filaHeader}>
          <Text style={styles.textoHeader}>Producto</Text>
          <Text style={styles.textoHeader}>Cantidad</Text>
          <Text style={styles.textoHeader}>Precio Unitario</Text>
        </View>
  
        {productos.map((producto, index) => (
          <View key={index} style={styles.fila}>

            <Text style={styles.texto}>{getNombreProducto(producto.id_producto)}</Text>
            <TouchableOpacity onPress={() => quitarProducto(index)}>
                <Text style={{ color: 'red' }}>X</Text>
            </TouchableOpacity>
            <Text style={[styles.texto,{textAlign:"center"}]}>{producto.cantidad}</Text>
            <Text style={[styles.texto,{textAlign:"right"}]}>{producto.precio_final || 'No especificado'}</Text>

          </View>
        ))}
  
        <View style={[styles.filaTotal,{borderTopWidth: 1,borderTopColor: '#ddd'}]}>
          <Text style={styles.textoSubTotal}>Sub-Total:</Text>
          <Text style={styles.textoSubTotal}>{calcularSubTotal().toFixed(2)}</Text>
        </View>
        <View style={styles.filaTotal}>
          <Text style={styles.textoTotal}>Total:</Text>
          <Text style={styles.textoTotal}>{calcularTotal().toFixed(2)}</Text>
        </View>
      </View>
    );
  };
  





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
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

  productoContainer: {
    marginBottom: 10,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tiempoEntregaContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  tiempoEntregaInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,

  },
  textoDias: {
    fontSize: 16,
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
    },
    tablaContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
      },
      filaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 5,
        marginBottom: 5,
      },
      fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      filaTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        marginTop: 5,
      },
      textoHeader: {
        fontWeight: 'bold',
      },
      texto: {
        flex: 1,
      },
      textoTotal: {
        fontWeight: 'bold',
        color: '#007BFF',
      },
      textoSubTotal: {
        fontWeight: 'bold',
        color: 'black',
      },
});

export const NuevaCotizacion = () => {
    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Nueva Cotización"}/>
            <NuevaCotizacionForm />
        </View>
    )
};
