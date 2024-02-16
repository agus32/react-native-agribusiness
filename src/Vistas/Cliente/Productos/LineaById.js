import { useState, useEffect } from 'react';
import { getApiData } from '../../../services/ApiHandler';
import { AppBarTab } from '../../../components/AppBarTab';
import { ProductosList } from '../../Colaborador/Menu/FichasTecnicas';
import { useParams } from 'react-router-native';
import { View } from 'react-native';





export const LineaById = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('Fichas Técnicas');
    const { id } = useParams();

    const getProductos = async () => {
      const response = await getApiData(`linea/${id}`); 
      setProductos(response?.productos);
      setNombre(response?.nombre);
    };
    
    useEffect(() => {
      getProductos();
    } , []);
  
      return (
          <View style={{ width: '100%',flexGrow: 1 }}>
              <AppBarTab children={nombre}/>
              <ProductosList productos={productos}/>
          </View>
      )
  };
