import React,{useState,useEffect} from 'react';
import { View, Text, ImageBackground, StyleSheet,FlatList,TouchableOpacity,TextInput } from 'react-native';
import { AppBarTab } from '../../../components/AppBarTab';
import { Entypo,MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import { getApiData } from '../../../services/ApiHandler'
import { Azul } from '../../../constants/constants';
import { callNumber } from '../../../services/DownloadHandler';



const DirectorioComponent = ({departamentos}) => {
  const [filteredDepartamentos, setFilteredDepartamentos] = useState([]);
  const [searchText, setSearchText] = useState('');




  useEffect(() => {
    if (searchText.trim() === '') {
        setFilteredDepartamentos(departamentos);
    } else {
      const filtered = departamentos.filter(
        (departamento) =>
        departamento.nombre.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDepartamentos(filtered);
    }
  }, [searchText,departamentos]);


  



  return (
    <ImageBackground
      source={require('../../../media/fondo.png')}
      style={styles.fondo}
    >
      <View style={styles.contenido}>
      <FlatList
            style={{width: '100%'}}
            ListHeaderComponent={
            <View style={styles.searchContainer}>
                <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nombre.."
                value={searchText}
                onChangeText={setSearchText}
                />
                <Feather name="search" size={20} color="#757575" style={styles.searchIcon} />
           </View>
           }
            data={filteredDepartamentos}
            renderItem={({item}) => (
                <DepartamentoComponent departamento={item}/>
              )}
              keyExtractor={(item) => item.id_depto}
              ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                     <Text>No hay contactos para mostrar</Text>
                                  </View>}
      />
      <FooterRedes />

        

      </View>
    </ImageBackground>
  );
};

const DepartamentoComponent = ({departamento}) => {

  const handlePress = (telefono) => {
    try {
    callNumber(telefono);
    }
    catch (error) {
      console.error('Error al intentar llamar al departamento', error);
    }
  }

    return (
        <View style={styles.departamento}>
            <Text style={{fontWeight:'bold'}}>{departamento.nombre}</Text>
            <TouchableOpacity style={{marginRight:15}} onPress={() => {handlePress(departamento.telefono)}}>
                <MaterialCommunityIcons name="phone-in-talk" size={24} color={Azul} />
            </TouchableOpacity>
        </View>
    );
};


const FooterRedes = () => {
    return (
        <View style={styles.footer}>
            <Text style={{fontWeight:'bold'}}>Redes Sociales</Text>
            <Text >Buscanos como Agribussines Ecuador en:</Text>
            <View style={styles.redes}>
                <Entypo name="facebook-with-circle" size={24} color="black" />
                <Entypo name="linkedin-with-circle" size={24} color="black" />
                <Entypo name="instagram-with-circle" size={24} color="black" />
                <Entypo name="youtube-with-circle" size={24} color="black" />
            </View>
            <View style={styles.info}>
                <View style={styles.infoItem}>
                <Entypo name="mail-with-circle" size={16} color={Azul}/>
                <Text>info@agriecuador.com</Text>
                </View>
                <View style={styles.infoItem}>
                <MaterialCommunityIcons name="web" size={16} color={Azul} />
                <Text>www.agriecuador.com</Text>
                </View>
                <View style={styles.infoItem}>
                <Entypo name="location-pin" size={16} color={Azul} />
                <Text>Galo Plaza Lasso N67-103 y Los Ciruelos</Text>
                </View>
            </View>

        </View>
    );
    };

const styles = StyleSheet.create({

  fondo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  //  filter: 'brightness(1.3)',
  },
  redes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },


  contenido: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    width: '100%',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  
  },
    departamento: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,

    },
    searchContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        margin: 10,
        width: '90%',
      },
      searchInput: {
        flex: 1,
        paddingVertical: 10,
 
      },
      searchIcon: {
        position: 'absolute',
        right: 15,
      },


});


export const Directorio = () => {
  const [departamentos, setDepartamentos] = useState([]);

  const fetchDepartamentos = async () => {
    const data = await getApiData('departamento');
    setDepartamentos(data);
  }

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  return (
      <View style={{ width: '100%',flexGrow: 1 }}>
          <AppBarTab children={"Directorio"}/>
          <DirectorioComponent departamentos={departamentos}/>
      </View>
  )
};