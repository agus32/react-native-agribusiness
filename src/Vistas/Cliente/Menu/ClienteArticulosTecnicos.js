import { ArticulosList } from "../Eventos/ClienteEventos";
import React, { useState, useEffect } from 'react';
import { View} from 'react-native';
import { getApiData } from '../../../services/ApiHandler';
import { AppBarTab } from '../../../components/AppBarTab';


export const ClienteArticulosTecnicos = () => {
    const [articulos, setArticulos] = useState([]);

    const getArticulos = async () => {
      const response = await getApiData('articulo');
      console.log(response);
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