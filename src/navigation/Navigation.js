import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView,Alert,BackHandler} from 'react-native';
import {NavBar} from '../components/NavBar';
import {HomeScreen} from '../Vistas/Home/HomeScreen';
import {LoginScreen} from '../Vistas/Home/LoginScreen';
import { Productos } from '../Vistas/Admin/Productos/Productos';
import { Route,Routes,useNavigate,useLocation} from 'react-router-native';
import { Personas } from '../Vistas/Admin/Personas/Personas';
import { AdminMenu } from '../Vistas/Admin/AdminMenu';
import { Eventos } from '../Vistas/Admin/Eventos/Eventos';
import {ColaboradorInicio} from '../Vistas/Colaborador/ColaboradorInicio';
import { Solicitudes } from '../Vistas/Colaborador/Solicitudes/Solicitudes';
import { Cotizaciones } from '../Vistas/Colaborador/Cotizaciones/Cotizaciones';
import { NuevaSolicitud } from '../Vistas/Colaborador/Solicitudes/NuevaSolicitud';
import { ListaSolicitudes } from '../Vistas/Colaborador/Solicitudes/ListaSolicitudes';
import { Perfil } from '../Vistas/Perfil';
import { ColaboradorMenu } from '../Vistas/Colaborador/Menu/ColaboradorMenu';
import {ArchivosInteres} from '../Vistas/Colaborador/Menu/ArchivosInteres';
import { FichasTecnicas } from '../Vistas/Colaborador/Menu/FichasTecnicas';
import {NuevaCotizacion} from '../Vistas/Colaborador/Cotizaciones/NuevaCotizacion';
import { ListaCotizaciones } from '../Vistas/Colaborador/Cotizaciones/ListaCotizaciones';
import { GaleriaCompartida } from '../Vistas/Colaborador/Menu/GaleriaCompartida';
import { GaleriaByID } from '../Vistas/Colaborador/Menu/GaleriaById';
import { ClienteInicio } from '../Vistas/Cliente/ClienteInicio';
import {LineasNegocio} from '../Vistas/Cliente/Productos/LineasNegocio';
import { LineaById } from '../Vistas/Cliente/Productos/LineaById';
import {ClienteEventos} from '../Vistas/Cliente/Eventos/ClienteEventos';
import {ClienteMenu} from '../Vistas/Cliente/Menu/ClienteMenu';
import {Directorio} from '../Vistas/Cliente/Menu/Directorio';
import {ClienteArticulosTecnicos} from '../Vistas/Cliente/Menu/ClienteArticulosTecnicos';
import { Chat } from '../components/Chat';
import { ChatList } from '../components/ChatList';
import { IniciarChat } from '../Vistas/Cliente/Chat/IniciarChat';
import { usePerson } from '../context/PersonContext';
import { InvitadoChat } from '../Vistas/Invitado/InvitadoChat';
import {RegisterForm} from '../Vistas/Home/RegisterForm';
import { ArticulosTecnicos } from '../Vistas/Admin/ArticulosTecnicos/ArticulosTecnicos';
import { EditarCotizacion } from '../Vistas/Colaborador/Cotizaciones/EditarCotizacion';

const Admin= () => {
    return (

        <SafeAreaView style={styles.container}>
        <Routes> 
            <Route exact path="/"   element={<AdminMenu/>}/>
            <Route path="/usuarios" element={<Personas/>}/>
            <Route path="/productos" element={<Productos/>}/>
            <Route path="/eventos" element={<Eventos/>}/>
            <Route path="/articulos" element={<ArticulosTecnicos/>}/>
            <Route path="/menu" element={<AdminMenu/>}/>
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/chat" element={<AdminMenu/>}/>
        </Routes>
        <NavBar/>
        </SafeAreaView>
      );
}

const Colaborador= () => {
    return (

        <SafeAreaView style={styles.container}>
        <Routes> 
            <Route exact path="/"   element={<ColaboradorInicio/>}/>
            <Route path="/solicitudes" element={<Solicitudes/>}/>
            <Route path="/solicitudes/nueva" element={<NuevaSolicitud/>}/>
            <Route path="/solicitudes/lista" element={<ListaSolicitudes/>}/>
            <Route path="/cotizaciones" element={<Cotizaciones/>}/>
            <Route path="/cotizaciones/nueva" element={<NuevaCotizacion/>}/>
            <Route path="/cotizaciones/lista" element={<ListaCotizaciones/>}/>
            <Route path="/cotizaciones/editar/:id" element={<EditarCotizacion/>}/>
            <Route path="/menu" element={<ColaboradorMenu/>}/>
            <Route path="/menu/galeria" element={<GaleriaCompartida/>}/>
            <Route path="/menu/galeria/:id" element={<GaleriaByID/>}/>
            <Route path="/menu/archivos" element={<ArchivosInteres/>}/>
            <Route path="/menu/archivos/fichas" element={<FichasTecnicas/>}/>
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/chat" element={<ChatList/>}/>
            <Route path="/chat/:cedula" element={<Chat/>}/>
        </Routes>     
        <NavBar/>
        </SafeAreaView>
      );
}

const Cliente = () => {
    return (

        <SafeAreaView style={styles.container}>
        <Routes> 
            <Route exact path="/"   element={<ClienteInicio/>}/>
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/productos" element={<LineasNegocio/>}/>
            <Route path="/productos/:id" element={<LineaById/>}/>
            <Route path="/eventos" element={<ClienteEventos/>}/>
            <Route path="/menu" element={<ClienteMenu/>}/>
            <Route path="/menu/directorio" element={<Directorio/>}/>
            <Route path="/menu/articulos" element={<ClienteArticulosTecnicos/>}/>
            <Route path="/chat" element={<ChatList/>}/>
            <Route path="/chat/:cedula" element={<Chat/>}/>
            <Route path="/iniciarChat" element={<IniciarChat/>}/>
        </Routes>     
        <NavBar/>
        </SafeAreaView>
      );
}

const Invitado = () => {
    return (

        <SafeAreaView style={styles.container}>
        <Routes> 
            <Route exact path="/"   element={<ClienteInicio/>}/>
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/productos" element={<LineasNegocio/>}/>
            <Route path="/productos/:id" element={<LineaById/>}/>
            <Route path="/eventos" element={<ClienteEventos/>}/>
            <Route path="/menu" element={<ClienteMenu/>}/>
            <Route path="/menu/directorio" element={<Directorio/>}/>
            <Route path="/menu/articulos" element={<ClienteArticulosTecnicos/>}/>
            <Route path="/chat" element={<InvitadoChat/>}/>
        </Routes>     
        <NavBar/>
        </SafeAreaView>
      );
}

const Home= () => {
    return(
        <SafeAreaView style={styles.container}>
        <Routes> 
            <Route exact path="/"   element={<HomeScreen/>}/>
            <Route path="/login" element={<LoginScreen/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
        </Routes>     
        </SafeAreaView>
    );
}



export const Navigation = () => {
    const {user} = usePerson();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const backAction = () => {
            
        if(location.pathname === "/") {
            Alert.alert('Advertencia', 'Estas seguro que deseas salir?', [
            {
                text: 'No',
                onPress: () => null,
                style: 'cancel',
            },
            {text: 'Si', onPress: () => BackHandler.exitApp()},
            ]);
        } else navigate(-1);
        return true;
        };

        const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
        );

        return () => backHandler.remove();
    }, [location]);

    if (user != {}){
        switch(user.rol){
            case "admin":
                return <Admin/>;
            case "colaborador":
                return <Colaborador/>;
            case "cliente":
                return <Cliente/>;
            case "invitado":
                return <Invitado/>;
            default:
                return <Home/>;
        }
    }else return <Home/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});
