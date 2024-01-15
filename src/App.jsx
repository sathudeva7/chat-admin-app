import './App.css'
import 'tailwindcss/tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import UserApp from './router/UserApp';

function App() {

  return (
    <BrowserRouter>
       <UserApp />
    </BrowserRouter>
  )
}

export default App
