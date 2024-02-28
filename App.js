import { NativeRouter} from 'react-router-native';
import { Navigation } from './src/navigation/Navigation';
import { PersonProvider } from './src/context/PersonContext';


export default function App() {
  

  return(
    <NativeRouter>
      <PersonProvider>
       <Navigation/>
      </PersonProvider>
    </NativeRouter>
  );
  
}