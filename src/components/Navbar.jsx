import NavLink from './NavLink';
import { FaBlog, FaUser } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };
  return (
    <nav className="flex justify-between px-8 py-6 bg-purple-500 shadow-xl text-white">
      <NavLink
        route="/"
        content={
          <button className="font-bold text-3xl hover:cursor-pointer flex items-center gap-3">
            <FaBlog className="text-white" size={40} />
            <span>Odin Blog</span>
          </button>
        }
      />

      {user ? (
        <div className="flex gap-8 items-center">
          <div className="flex gap-2 items-center">
            <FaUser className="text-white" size={20} />
            <p className="text-xl font-semibold">{user.username}</p>
          </div>

          {user.role === 'admin' && (
            <NavLink route="/posts/new" content="New Post" className="hover:underline text-xl" />
          )}

          <button
            className="text-xl font-semibold cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-8 items-center">
          <NavLink route="/register" content="Register" className="hover:underline text-xl" />
          <NavLink route="/login" content="Log In" className="hover:underline text-xl" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
