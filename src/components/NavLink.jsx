// NavLink.js
import { Link } from 'react-router';

const NavLink = ({ route, content, className = '' }) => {
  return (
    // We move the styling responsibility to where the component is used
    <Link to={route} className={`no-underline ${className}`}>
      {content}
    </Link>
  );
};

export default NavLink;
