import NavLink from './NavLink';
import { FaBlog } from 'react-icons/fa';

const Navbar = () => {
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

      <div className="flex gap-8 items-center">
        <NavLink route="/register" content="Register" className="hover:underline text-xl" />
        <NavLink route="/login" content="Log In" className="hover:underline text-xl" />
      </div>
    </nav>
  );
};

export default Navbar;
