import { Link } from 'react-router';

const NavLink = ({ route, content, className = '' }) => {
  return (
    <Link to={route} className={`no-underline ${className} font-semibold`}>
      {content}
    </Link>
  );
};

export default NavLink;
