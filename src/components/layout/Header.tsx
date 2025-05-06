import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">EventMgt</Link>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:text-blue-200">Home</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-blue-200">Events</Link>
              </li>

              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/profile" className="hover:text-blue-200">Profile</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => logout()}
                      className="hover:text-blue-200"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="hover:text-blue-200">Login</Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:text-blue-200">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
