import React from 'react';
import { View, Text, ImageBackground, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { AppBarTab } from '../components/AppBarTab';
import { SimpleLineIcons,Entypo } from '@expo/vector-icons';
import { Verde,Azul } from '../constants/constants';
import { getApiData } from '../services/ApiHandler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-native';

const PerfilComponent = ({onLogout}) => {
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const loggedUser = await AsyncStorage.getItem('loggedUser');
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      const data = await getApiData('persona/'+ parsedUser.cedula);
      setUser(data);
      console.log(data);
  }}
  React.useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <ImageBackground
      source={require('../media/fondo.png')}
      style={styles.fondo}
    >
      <View style={styles.contenido}>

      <View style={styles.fotoPerfil}>
          <Image
            source={require('../media/perfil.png')}
            style={styles.fotoPerfilImagen}
          />
        </View>


        <Text style={styles.nombre}>{user.nombre}</Text>
        <Text style={styles.cargo}>{user.cargo?.nombre ?? 'Cliente'}</Text>


        <Text style={styles.datosContacto}>Datos de Contacto</Text>


        <View style={styles.infoContacto}>
          <View style={styles.iconoContacto}>
            <Entypo name="old-phone" size={30} color={Verde} />
            <Text style={styles.textoContacto}> {user.telefono}</Text>
          </View>
          <View style={styles.iconoContacto}>
            <Entypo name="email" size={30} color={Verde} />
            <Text style={styles.textoContacto}>{user.correo}</Text>
          </View>
          <View style={styles.iconoContacto}>
            <Entypo name="address" size={30} color={Verde} />
            <Text style={styles.textoContacto}>{user.direccion}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.botonCerrarSesion} onPress={handleLogout}>
          <SimpleLineIcons name="logout" size={30} color={Azul} >
          <Text style={styles.textoCerrarSesion}>Cerrar Sesión</Text>
          </SimpleLineIcons>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  fondo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  //  filter: 'brightness(1.2)',
  },

  contenido: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    
    marginTop: 30,
  },
  fotoPerfil: {
    width: 180,
    height: 180,
    overflow: 'hidden',
    marginBottom: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'gray',


  },
  fotoPerfilImagen: {
    width: '100%',
    height: '100%',
  },
  nombre: {
    fontSize: 30,
    color: Azul,
    marginBottom: 5,
    marginTop: '1rem',
  },
  cargo: {
    fontSize: 22,
    color: 'black',
    marginBottom: 20,
    marginTop: '0.5rem',
  },
  datosContacto: {
    fontSize: 20,
    color: Azul,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  infoContacto: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    marginBottom: 20,
  },
  iconoContacto: {
    marginTop: '0.5rem',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  textoContacto: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  botonCerrarSesion: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,

  },
  textoCerrarSesion: {
    fontSize: 16,
    color: Azul,
    marginLeft: 10,

  },
});


export const Perfil = ({onLogout}) => {
  return (
      <View style={{ width: '100%',flexGrow: 1 }}>
          <AppBarTab children={"Perfil"}/>
          <PerfilComponent onLogout={onLogout} />
      </View>
  )
};