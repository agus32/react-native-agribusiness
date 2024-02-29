import { ArticulosList } from "../Eventos/ClienteEventos";
import React, { useState, useEffect } from 'react';
import { View} from 'react-native';
import { getApiData } from '../../../services/ApiHandler';
import { AppBarTab } from '../../../components/AppBarTab';


export const ArticulosTecnicos = () => {
    const [articulos, setArticulos] = useState([]);

    const getArticulos = async () => {
      const response = await getApiData('articulo');
      
      setArticulos(response);
    };
  
    useEffect(() => {
      getArticulos();
    }, []);

        return (
            <View style={{ width: '100%',flexGrow: 1 }}>
                <AppBarTab children={"Artículos Técnicos"}/>
                <ArticulosList articulos={articulos}/>
            </View>
        )
    };