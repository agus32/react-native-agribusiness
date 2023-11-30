import { StyleSheet, SafeAreaView} from 'react-native';
import {NavBar} from '../components/NavBar';
import {HomeScreen} from '../Vistas/Home/HomeScreen';
import {LoginScreen} from '../Vistas/Home/LoginScreen';
import { Productos } from '../Vistas/Admin/Productos/Productos';
import { Route,Routes } from 'react-router-native';
import { Personas } from '../Vistas/Admin/Personas/Personas';
import { AdminMenu } from '../Vistas/Admin/AdminMenu';
import { Eventos } from '../Vistas/Admin/Eventos/Eventos';


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
                return <Home LoggedUser={LoggedUser}/>;
            case "cliente":
                return <Home LoggedUser={LoggedUser}/>;
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
