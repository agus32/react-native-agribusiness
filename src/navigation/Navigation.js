import { StyleSheet, View} from 'react-native';
import {NavBar} from '../components/NavBar';
import {HomeScreen} from '../Vistas/Home/HomeScreen';
import {LoginScreen} from '../Vistas/Home/LoginScreen';
import { Productos } from '../Vistas/Admin/Productos/Productos';
import { Route,Routes } from 'react-router-native';
import { Personas } from '../Vistas/Admin/Personas/Personas';
import { AdminMenu } from '../Vistas/Admin/AdminMenu';
import { useAuth } from '../context/UserContext';
import { Eventos } from '../Vistas/Admin/Eventos/Eventos';
import { Notificaciones } from '../Vistas/Admin/Notificaciones/Notificaciones';

export const Admin= () => {
    return (

        <View style={styles.container}>
        <Routes> 
            <Route exact path="/"   element={<AdminMenu/>}/>
            <Route path="/usuarios" element={<Personas/>}/>
            <Route path="/productos" element={<Productos/>}/>
            <Route path="/eventos" element={<Eventos/>}/>
            <Route path="/notificaciones" element={<Notificaciones/>}/>
        </Routes>     
        <NavBar/>
        </View>
      );
}

export const Home= () => {
    return(
        <View style={styles.container}>
        <Routes> 
            <Route exact path="/"   element={<HomeScreen/>}/>
            <Route path="/login" element={<LoginScreen/>}/>
        </Routes>     
        </View>
    );
}



export const Navigation = () => {
    const { user,login } = useAuth();
    //login({nombre: "admin", rol:"admin"},"1234");

    if (user != null){
        switch(user.rol){
            case "admin":
                return <Admin/>;
            case "colaborador":
                return <Home/>;
            case "cliente":
                return <Home/>;
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
    
  },
});
