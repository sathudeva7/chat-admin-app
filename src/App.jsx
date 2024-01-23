import './App.css'
import 'tailwindcss/tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import UserApp from './router/UserApp';
import AuthProvider from './context/authContext';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <UserApp />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
