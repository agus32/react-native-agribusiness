import { NativeRouter} from 'react-router-native';
import { AuthProvider } from './src/context/UserContext';
import { Navigation } from './src/navigation/Navigation';

export default function App() {
  return (
    <AuthProvider>
      <NativeRouter>
        <Navigation/>
      </NativeRouter>
    </AuthProvider>
  );
}
