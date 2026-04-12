import './styles/App.css';
import { Outlet } from 'react-router';

import Navbar from './components/Navbar';
import useAuth from './hooks/useAuth';
import AuthContext from './context/AuthContext';

function App() {
  const auth = useAuth();
  return (
    <AuthContext value={auth}>
      <div className="font-poppins bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </AuthContext>
  );
}

export default App;
