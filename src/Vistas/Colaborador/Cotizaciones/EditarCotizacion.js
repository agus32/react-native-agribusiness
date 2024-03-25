import React, { useState, useEffect } from 'react';
import { getApiData,putApiData } from '../../../services/ApiHandler';
import { AppBarTab } from '../../../components/AppBarTab';
import { useParams } from 'react-router-native';
import { View} from 'react-native';
import { NuevaCotizacionForm } from './NuevaCotizacion';

export const EditarCotizacion = () => {
    const [cotizacion, setCotizacion] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getCotizacion();
    }, []);

    const getCotizacion = async () => {
        const data = await getApiData(`cotizacion/${id}`);
        setCotizacion(data);

    };

    const handleEditar = async (cotizacion) => {
        console.log(cotizacion);
        const response = await putApiData("cotizacion",id, cotizacion);
        console.log(response);
        return response;
    }


    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Editar cotización"}/>
            <NuevaCotizacionForm cotizacion={cotizacion} handleEditar={handleEditar}/>
        </View>
    );
};




const test = {
    cliente_cedula: "22",
    cliente_nuevo: null,
    colaborador_cedula: "333333",
    disposiciones: "test",
    estado: "creada",
    fecha_creacion: "2024-03-15T03:54:36.000Z",
    file: "http://agribussiness.thorque.com.ar:80/files/cotizaciones/1710474876389.pdf",
    forma_pago: "Contado",
    nro_cotizacion: 8,
    productos: [
      {
        descripcion: "excelente produccion y resistente",
        ficha_tecnica: null,
        id_producto: 4,
        id_proveedor: 3,
        is_deleted: 0,
        iva: 21,
        nombre: "Pimiento canario",
        portada: "1709555838902.jpeg",
        precio: "2500.00",
        presentacion: "sobre de 1000 semillas",
        cantidad: 5
      },
      {
        descripcion: "Excelente produccion y resistencia.",
        ficha_tecnica: null,
        id_producto: 5,
        id_proveedor: 1,
        is_deleted: 0,
        iva: 0,
        nombre: "Repollo megaroon",
        portada: "1709555951185.jpeg",
        precio: "1000.00",
        presentacion: "Sobre de 1000 semillas",
        cantidad: 8
      }
    ],
    tiempo_entrega: 1
  };
  