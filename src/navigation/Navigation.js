import { StyleSheet, SafeAreaView} from 'react-native';
import {NavBar} from '../components/NavBar';
import {HomeScreen} from '../Vistas/Home/HomeScreen';
import {LoginScreen} from '../Vistas/Home/LoginScreen';
import { Productos } from '../Vistas/Admin/Productos/Productos';
import { Route,Routes } from 'react-router-native';
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
import {ArticulosTecnicos} from '../Vistas/Cliente/Menu/ArticulosTecnicos';
import { Chat } from '../components/Chat';
import { ChatList } from '../components/ChatList';
import { IniciarChat } from '../Vistas/Cliente/Chat/IniciarChat';

export const Admin= ({handleLogout}) => {
    return (

        <SafeAreaView style={styles.container}>
        <Routes> 
            <Route exact path="/"   element={<AdminMenu handleLogout={handleLogout}/>}/>
            <Route path="/usuarios" element={<Personas/>}/>
            <Route path="/productos" element={<Productos/>}/>
            <Route path="/eventos" element={<Eventos/>}/>
        </Routes>     
        <NavBar/>
        </SafeAreaView>
      );
}

export const Colaborador= ({handleLogout}) => {
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
            <Route path="/menu" element={<ColaboradorMenu/>}/>
            <Route path="/menu/galeria" element={<GaleriaCompartida/>}/>
            <Route path="/menu/galeria/:id" element={<GaleriaByID/>}/>
            <Route path="/menu/archivos" element={<ArchivosInteres/>}/>
            <Route path="/menu/archivos/fichas" element={<FichasTecnicas/>}/>
            <Route path="/perfil" element={<Perfil onLogout={handleLogout}/>}/>
            <Route path="/notificaciones" element={<Eventos/>}/>
        </Routes>     
        <NavBar/>
        </SafeAreaView>
      );
}

export const Cliente = ({handleLogout}) => {
    return (

        <SafeAreaView style={styles.container}>
        <Routes> 
            <Route exact path="/"   element={<ClienteInicio/>}/>
            <Route path="/perfil" element={<Perfil onLogout={handleLogout}/>}/>
            <Route path="/productos" element={<LineasNegocio/>}/>
            <Route path="/productos/:id" element={<LineaById/>}/>
            <Route path="/eventos" element={<ClienteEventos/>}/>
            <Route path="/menu" element={<ClienteMenu/>}/>
            <Route path="/menu/directorio" element={<Directorio/>}/>
            <Route path="/menu/articulos" element={<ArticulosTecnicos/>}/>
            <Route path="/notificaciones" element={<ChatList/>}/>
            <Route path="/chat/:cedula" element={<Chat/>}/>
            <Route path="/iniciarChat" element={<IniciarChat/>}/>
        </Routes>     
        <NavBar/>
        </SafeAreaView>
      );
}

export const Home= ({LoggedUser}) => {
    return(
        <SafeAreaView style={styles.container}>
        <Routes> 
            <Route exact path="/"   element={<HomeScreen/>}/>
            <Route path="/login" element={<LoginScreen LoggedUser={LoggedUser}/>}/>
        </Routes>     
        </SafeAreaView>
    );
}



export const Navigation = ({user,LoggedUser,handleLogout}) => {
   
    if (user != {}){
        switch(user.rol){
            case "admin":
                return <Admin handleLogout={handleLogout}/>;
            case "colaborador":
                return <Colaborador handleLogout={handleLogout}/>;
            case "cliente":
                return <Cliente handleLogout={handleLogout}/>;
            default:
                return <Home LoggedUser={LoggedUser}/>;
        }
    }else return <Home LoggedUser={LoggedUser}/>;
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
