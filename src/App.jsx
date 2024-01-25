import './App.css'
import 'tailwindcss/tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import UserApp from './router/UserApp';
import AuthProvider from './context/authContext';
import DepartmentProvider from './context/departmentContext';
import UserProvider from './context/userContext';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
        <DepartmentProvider>
          <UserApp />
        </DepartmentProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
