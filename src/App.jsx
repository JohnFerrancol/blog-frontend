import './styles/App.css';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

import useAuth from './hooks/useAuth';
import useBlog from './hooks/useBlog';
import AuthContext from './context/AuthContext';
import BlogContext from './context/BlogContext';

function App() {
  const auth = useAuth();
  const blog = useBlog();
  return (
    <AuthContext value={auth}>
      <BlogContext value={blog}>
        <div className="font-poppins bg-gray-50 min-h-screen flex flex-col">
          <Navbar />
          <Outlet />
        </div>
      </BlogContext>
    </AuthContext>
  );
}

export default App;
